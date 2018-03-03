import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';

import { SoapService} from './services/soap.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule,
  MatCheckboxModule ,
  MatInputModule,
  MatOptionModule,
  MatSelectModule ,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatListModule,
  MatSidenavModule,
  MatMenuModule,
  MatToolbarModule,
  MatTableModule,
  MatStepperModule,
  MatSnackBarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { SncfService } from './services/sncf.service';
import { CurrencyConvertorComponent } from './components/currency-convertor/currency-convertor.component';

import { RouterModule, Routes } from '@angular/router';


import { MaterialTimeControlModule } from '../../node_modules/material-time-control/src/material-time-control.module';
import { SearchJourneyComponent } from './components/search-journey/search-journey.component';
import {MatDialogModule} from '@angular/material/dialog';
import { JourneyDetailsComponent } from './components/journey-details/journey-details.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import {environment} from '../environments/environment';

import { NgxSoapModule } from 'ngx-soap';
const appRoutes: Routes = [
  { path: 'currency-convertor', component: CurrencyConvertorComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    CurrencyConvertorComponent,
    SearchJourneyComponent,
    JourneyDetailsComponent,
    ReservationsComponent
  ],
  entryComponents: [
    JourneyDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatListModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    MaterialTimeControlModule,
    MatDialogModule,
    MatStepperModule,
    MatSnackBarModule,
    NgxSoapModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  bootstrap: [AppComponent],
  providers : [SoapService, SncfService, AngularFirestore]
})
export class AppModule { }
