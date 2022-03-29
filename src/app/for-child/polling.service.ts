import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { shareReplay, timer } from 'rxjs';

@Injectable({ providedIn: 'root' }) //if we remove providedIn and add to module provider for lazy loaded it will create new instances
export class PollingService {
  public polling$ = timer(0, this.interval).pipe(shareReplay());

  constructor(@Optional() @Inject(INTERVAL) private interval: number) {} //using injection token get the interval which will be passed by Injector
}

export interface PollingConfig {
  interval?: number;
}

export const INTERVAL = new InjectionToken<number>('interval');
