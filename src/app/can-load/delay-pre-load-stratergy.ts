import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DelayPreLoadStratergy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      let delay = route.data['delay'] ?? 1000;
      console.log('delay set for preload is ' + delay);
      return timer(delay).pipe(switchMap((_) => load()));
    }

    return of(null);
  }
}
