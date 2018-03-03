import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SoapService} from './services/soap.service';
import { SncfService} from './services/sncf.service';
import {Place} from '../models/place';
import {Journey} from '../models/journey';


import {MatTableDataSource} from '@angular/material';

import {CurrencyConvertorComponent } from './components/currency-convertor/currency-convertor.component';
import {SearchJourneyComponent } from './components/search-journey/search-journey.component';

import 'rxjs/add/observable/forkJoin';

import {Utilities} from '../models/utilities';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [HttpClient],
})
export class AppComponent {
  title = 'Find your train';


  getJourneys () {
    /*
    this.sncfService.getJourneys('2.3749036;48.8467927', '2.2922926;48.8583736').subscribe(data => {
      console.log(data);
    });*/
  }


}
