import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class SncfService {

  private auth: HttpHeaders;

  constructor(private http: HttpClient) {
    this.auth = new HttpHeaders().set('Authorization', 'cdf710dd-cc11-4377-b229-4ec98e963c54');
  }

  public getJourneys (from: string, to: string, dateTime: string) {
      return this.http.get('https://api.sncf.com/v1/coverage/sncf/journeys',
        { 'params' :
                  {'from': from, 'to' : to , 'datetime' : dateTime  , 'min_nb_journeys' : '10' , 'datetime_represents' : 'departure'},
                  'headers' : this.auth,
      });
  }
  public getPlaces (place: string) {
    return this.http.get('\n' +
      'https://api.sncf.com/v1/coverage/sncf/places',
      {
        'params' : {
          'q' : place
        },
        'headers' : this.auth
      });
   }

}
