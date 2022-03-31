import { Injectable } from '@angular/core';
import { fromEvent, Observable, of, share, Subject, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RxjsService {
  private sub$: Subject<number> = new Subject();

  obs$: Observable<number> = this.sub$.asObservable();

  constructor() {}

  getCommonObs() {
    return of(10);
  }

  getNumberObs() {
    return of([20]);
  }

  getStringObs() {
    return of('Janitha');
  }

  getSharedObs() {
    return of('share').pipe(share());
  }

  getTimerObs() {
    return timer(0, 1000);
  }

  emitNumber(number: number) {
    this.sub$.next(number);
  }

  clickObs() {
    return fromEvent(document, 'click');
  }
}
