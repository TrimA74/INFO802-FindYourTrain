import {Section} from './section';
import {Utilities} from './utilities';

export class Journey {
  public arrivalDateTime: Date;
  public departureDateTime: Date;
  public journeyTime: string;
  public sections: Section[];
  public price: number;
  public distance: number;
  public fBid: string;
  public currency: string;

  constructor(arrivalDateTime: string, departureDateTime: string, duration: number, sections: Section[], price: number, distance: number, selectedCurrency : string) {
    this.arrivalDateTime = new Date(
      Number.parseInt(arrivalDateTime.substr(0, 4)),
      Number.parseInt(arrivalDateTime.substr(4, 2)),
      Number.parseInt(arrivalDateTime.substr(6, 2)),
      Number.parseInt(arrivalDateTime.substr(9, 2)),
      Number.parseInt(arrivalDateTime.substr(11, 2)),
      Number.parseInt(arrivalDateTime.substr(13, 2))
    );
    this.departureDateTime = new Date(
      Number.parseInt(departureDateTime.substr(0, 4)),
      Number.parseInt(departureDateTime.substr(4, 2)),
      Number.parseInt(departureDateTime.substr(6, 2)),
      Number.parseInt(departureDateTime.substr(9, 2)),
      Number.parseInt(departureDateTime.substr(11, 2)),
      Number.parseInt(departureDateTime.substr(13, 2))
    );
    this.journeyTime = Utilities.SecondsTohhmmss(duration);
    this.sections = sections;
    this.price = Math.round(price);
    this.distance = Math.round(distance);
    this.currency = selectedCurrency;
  }


}
