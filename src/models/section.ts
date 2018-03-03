import {Utilities} from './utilities';
import {Place} from './place';

export class Section {
  public arrivalDateTime: Date;
  public departureDateTime: Date;
  public journeyTime: string;
  public mode: string;
  public type: string;
  public commercial_mode: string;
  public iconName: string;
  public latD: number;
  public lonD: number;
  public latA: number;
  public lonA: number;
  public price: number;
  public distance: number;
  private from: Place;
  private to: Place;


  constructor(e: any) {

    this.arrivalDateTime = new Date(
      Number.parseInt(e.arrival_date_time.substr(0, 4)),
      Number.parseInt(e.arrival_date_time.substr(4, 2)),
      Number.parseInt(e.arrival_date_time.substr(6, 2)),
      Number.parseInt(e.arrival_date_time.substr(9, 2)),
      Number.parseInt(e.arrival_date_time.substr(11, 2)),
      Number.parseInt(e.arrival_date_time.substr(13, 2))
    );
    this.departureDateTime = new Date(
      Number.parseInt( e.departure_date_time.substr(0, 4)),
      Number.parseInt( e.departure_date_time.substr(4, 2)),
      Number.parseInt( e.departure_date_time.substr(6, 2)),
      Number.parseInt( e.departure_date_time.substr(9, 2)),
      Number.parseInt( e.departure_date_time.substr(11, 2)),
      Number.parseInt( e.departure_date_time.substr(13, 2))
    );
    this.journeyTime = Utilities.SecondsTohhmmss(e.duration);

    this.type = e.type;
    if (this.type === 'public_transport') {
      this.latD = e.from.stop_point.coord.lat;
      this.lonD = e.from.stop_point.coord.lon;
      this.latA = e.to.stop_point.coord.lat;
      this.lonA = e.to.stop_point.coord.lon;
    }
    if (this.type !== 'waiting') {
      if (e.to.embedded_type === 'stop_area') {
        const tmp = e.to.stop_area;
        this.to = new Place(tmp.label, tmp.coord.lat, tmp.coord.lon, tmp.id);
      } else {
        const tmp = e.to.stop_point;
        this.to = new Place(tmp.label, tmp.coord.lat, tmp.coord.lon, tmp.id);
      }

      if (e.from.embedded_type === 'stop_area') {
        const tmp = e.from.stop_area;
        this.from = new Place(tmp.label, tmp.coord.lat, tmp.coord.lon, tmp.id);
      } else {
        const tmp = e.from.stop_point;
        this.from = new Place(tmp.label, tmp.coord.lat, tmp.coord.lon, tmp.id);
      }

    }

    this.setIconName(e);

  }


  private  setIconName(e) {

    if (e.type === 'crow_fly') {this.iconName = 'directions_run'; this.commercial_mode = 'run';  this.type = 'Walking'; }
    if (e.type === 'transfer') {this.iconName = 'directions_walk'; this.commercial_mode = 'walk'; this.type = 'Transfer'; }
    if (e.type === 'public_transport') {
      this.type = 'Transport public';
      this.iconName = 'train';
      this.commercial_mode = e.display_informations.physical_mode;
    }
    if (this.type === 'waiting') {
      this.iconName = 'accessibility';
      this.commercial_mode = 'wait';
    }
  }


}
