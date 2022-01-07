declare namespace AMap {
  export class Marker {
    constructor(MarkerOptions: any);

    visible: boolean;

    center: LngLat;

    C: any;

    hide(): void;

    show(): void;

    getPosition(): LngLat;

    on(eventName: string, handler: Function, context?: any): void;

    off(eventName: string, handler: Function, context?: any): void;

    getCenter(): LngLat;
  }
}
