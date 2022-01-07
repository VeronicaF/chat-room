declare namespace AMap {
  export class InfoWindow {
    constructor(InfoWindowOptions: any); // see https://lbs.amap.com/api/javascript-api/reference/infowindow#InforWindowOptions

    open(map: Map, pos: LngLat): void;
  }
}
