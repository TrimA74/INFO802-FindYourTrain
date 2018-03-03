import { Component, OnInit } from '@angular/core';
import {Place} from '../../../models/place';
import {Journey} from '../../../models/journey';
import {Utilities} from '../../../models/utilities';
import {SoapService} from '../../services/soap.service';
import {SncfService} from '../../services/sncf.service';
import {MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {isNull} from 'util';
import {Section} from '../../../models/section';
import { Observable } from 'rxjs/Observable';
import { JourneyDetailsComponent } from '../journey-details/journey-details.component';
import { AngularFirestore,AngularFirestoreCollection  } from 'angularfire2/firestore';

@Component({
  selector: 'app-search-journey',
  templateUrl: './search-journey.component.html',
  styleUrls: ['./search-journey.component.css']
})
export class SearchJourneyComponent implements OnInit {

  private currencies: string[];
  private places: Place[];
  private journeys: Journey[];
  private placeA: Place;
  private placeD: Place;
  private journeysSource: any;
  private displayedColumnsJourneys: string[];
  private dateTime: string;
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  private selectedCurerncy: string;
  private journeysCollection: AngularFirestoreCollection<Journey>;

  ngOnInit () {

  }

  getPlaces (place: string) {
    this.places = [];
    this.sncfService.getPlaces(place).subscribe( (data: any) => {
      data.places.forEach( e => {
        if (e.embedded_type === 'administrative_region') {
          //this.places.push(new Place(e.name, e.administrative_region.coord.lat, e.administrative_region.coord.lon));
        } else {
          this.places.push(new Place(e.name, e.stop_area.coord.lat, e.stop_area.coord.lon, e.id));
        }
      });
    });
  }
  getCurrencies () {
    this.soapService.getCurrenciesList().subscribe( data => {
      this.currencies = data;
    });
  }
  getPrice () {
    this.soapService.getPrice(46.077618, 6.408105, 46.193401, 6.234109).subscribe( data => {
      console.log(data);
    });
  }
  searchJourneys() {
    const calls: Observable<number>[] = [];
    this.journeys = [];
    this.sncfService.getJourneys(this.placeD.id, this.placeA.id, this.dateTime).subscribe((data: any) => {
      console.log(data);
      data.journeys.forEach(e => {
        const sections: Section[] = [];
        let journeyDistance = 0;
        e.sections.forEach( sec => {
          journeyDistance = 0;
          const section = new Section(sec);
          if (sec.type === 'public_transport') {
            const test = this.soapService.getDistance(section.latA, section.lonA, section.latD, section.lonD);
            calls.push(test);
            test.subscribe((data: number) => {
              sec.distance = +data;
              journeyDistance += sec.distance;
            });
          }
          sections.push(section);
        });
        Observable.forkJoin(calls).subscribe( (data: any) => {
          if (this.selectedCurerncy !== 'EUR') {
            this.soapService.getConvertedAmount('EUR', this.selectedCurerncy, journeyDistance * 0.18).subscribe( (data: number) => {
              this.journeys.push(new Journey(e.arrival_date_time, e.departure_date_time, e.duration, sections, data, journeyDistance , this.selectedCurerncy));
              this.journeysSource = new MatTableDataSource<Journey>(this.journeys);
            });
          } else {
            this.journeys.push(new Journey(e.arrival_date_time, e.departure_date_time, e.duration, sections, journeyDistance * 0.18 , journeyDistance , this.selectedCurerncy));
            this.journeysSource = new MatTableDataSource<Journey>(this.journeys);
          }

        });

      });
    });
  }
  arrivingSelected (place: Place) {
    this.placeA = place;
  }
  departingSelected (place: Place) {
    this.placeD = place;
  }
  displayFn(val: Place) {
    return val ? val.name : val;
  }
  setDateTime (date) {
    const tmp = new Date(date);
    let tmpString;
    tmpString = tmp.toISOString().replace(/[-Z.:\s]/g, '');
    tmpString = tmpString.split('T')[0];
    tmpString +=  'T' + ( '0' + this.exportTime.hour.toString()).slice(-2) + ( '0' + this.exportTime.minute.toString()).slice(-2) + '00';
    this.dateTime = tmpString;
  }

  SecondsTohhmmss (totalSeconds: string) {
    return Utilities.SecondsTohhmmss(totalSeconds);
  }

  viewjourneyDetails(e: Journey): void {
    const dialogRef = this.dialog.open(JourneyDetailsComponent, {
      'data' : e
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
    });
  }

  constructor(private soapService: SoapService, private sncfService: SncfService, public dialog: MatDialog, public db: AngularFirestore, public snackBar: MatSnackBar) {
    this.currencies = [];
    this.places = [];
    this.getCurrencies();
    this.selectedCurerncy = 'EUR';
    this.displayedColumnsJourneys = ['departureDateTime' , 'arrivalDateTime', 'duration' , 'steps' , 'price' , 'distance' ,'actions'];
    this.journeysCollection = db.collection<Journey>('journeys');
  }

  saveJourney(e: Journey) {
    let journey: any;
    journey = Object.assign({}, e);
    this.journeysCollection.add(JSON.parse(JSON.stringify(e))).then((e: any) => {
      this.snackBar.open('Your reservation has beed added ! ', 'Close', {
        duration: 2000,
      });
    });
  }
}
