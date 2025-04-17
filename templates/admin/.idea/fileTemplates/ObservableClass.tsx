#set($NAME_CAP = $NAME.substring(0,1).toUpperCase() + $NAME.substring(1))
#set($Properties_CAP = $Properties.substring(0,1).toUpperCase() + $Properties.substring(1))
import { observable, Observable, WritableObservable } from 'micro-observables';

export class ${NAME_CAP} {
  private readonly ${Properties}: WritableObservable<boolean>
  constructor() {
    this.${Properties} = observable(false);
  }
  
  get${Properties_CAP}(): Observable<boolean> {
    return this.${Properties}.readOnly();
  }
  
  update${Properties_CAP}(${Properties}: boolean): void {
    this.${Properties}.set(${Properties});
  }
}