import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreLoadingStrategy implements PreloadingStrategy {
  isLoggedIn: boolean = true;

  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (this.isLoggedIn) return fn();
    return of(null);
  }
}
