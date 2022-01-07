import { Group } from 'three';

declare module 'three' {
  export class OBJLoader2 {
    setLogging(enabled: boolean, debug: boolean): void;

    load(
      url: string,
      onLoad: (g: Group) => void,
      onProgress?: (data: any) => void,
      onError?: (data: any) => void,
    ): void;
  }
}
