export class Place {
  public name: string;
  public lat: number;
  public lon: number;
  public id: string;

  constructor (name: string, lat: number, lon: number, id: string) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.id = id;

  }

}
