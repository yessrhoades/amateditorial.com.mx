import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  logged$ = new Subject<boolean>();
  name$ = new Subject<string>();

  constructor(

  ) {

  }

  setLogged(value : boolean):void {
    this.logged$.next(value);
  }

  setName(value : string):void {
    this.name$.next(value);
  }

  getLogged() {
    return this.logged$;
  }

  getName() {
    return this.name$;
  }

}
