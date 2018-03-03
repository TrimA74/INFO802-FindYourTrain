import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import {Journey} from '../../../models/journey';
import {MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';
import {Observable} from "rxjs/Observable";
import {JourneyDetailsComponent} from "../journey-details/journey-details.component";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {


  private journeysCollection: AngularFirestoreCollection<Object>;
  private journeysSource: any;
  private displayedColumnsJourneys: string[];
  private journeys: Journey[];

  constructor(public db: AngularFirestore, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.journeys = [];
    this.journeysCollection = db.collection('journeys');
    this.displayedColumnsJourneys = ['departureDateTime' , 'arrivalDateTime', 'duration' , 'steps' , 'price' , 'distance' , 'actions'];


  }

  viewjourneyDetails(e: Journey): void {
    const dialogRef = this.dialog.open(JourneyDetailsComponent, {
      'data' : e
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {
  }

  showRes() {
    this.journeys = [];
    this.db.collection('journeys').ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          const e = doc.data();
          const tmp: Journey = Object.setPrototypeOf(e, Journey.prototype);
          tmp.arrivalDateTime = new Date(tmp.arrivalDateTime);
          tmp.departureDateTime = new Date(tmp.departureDateTime);
          tmp.fBid = doc.id;
          tmp.sections.forEach( e => {
            e.departureDateTime = new Date(e.departureDateTime);
            e.arrivalDateTime = new Date(e.arrivalDateTime);
          });
          this.journeys.push(tmp);

        });
        console.log(this.journeys);
        this.journeysSource = new MatTableDataSource<Object>(this.journeys);
      });
    }

    /*
    const collection$: Observable<Object> = this.journeysCollection.valueChanges();
    collection$.subscribe((data: Object[]) => {
      data.forEach(e => {
        console.log(e);
        let tmp: Journey = Object.setPrototypeOf(e, Journey.prototype);
        tmp.arrivalDateTime = new Date(tmp.arrivalDateTime);
        tmp.departureDateTime = new Date(tmp.departureDateTime);
        tmp.sections.forEach( e => {
          e.departureDateTime = new Date(e.departureDateTime);
          e.arrivalDateTime = new Date(e.arrivalDateTime);
        });
        this.journeys.push(tmp);

      });
      console.log(this.journeys);
      this.journeysSource = new MatTableDataSource<Object>(this.journeys);
    });
    */

  deleteJourney(e: Journey) {
    const foundIndex = this.journeys.findIndex(x => x.fBid === e.fBid);
    this.db.collection('journeys').doc(e.fBid).delete().then((e: any) => {
      this.journeys.splice(foundIndex, 1);
      this.journeysSource = new MatTableDataSource<Object>(this.journeys);
      this.snackBar.open('Your reservation has beed deleted! ', 'Close', {
        duration: 2000,
      });
    }).catch((e: any) => {

    });
  }
}
