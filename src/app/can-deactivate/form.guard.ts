import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CanForm } from './form.interface';

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//
// export interface CanComponentDeactivate {
// canDeactivate: () => any;
// }

@Injectable({ providedIn: 'root' })
export class FormGuard implements CanDeactivate<CanForm> {
  canDeactivate(component: CanForm, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (component.canGoHome) return true;
    if (confirm('Are you sure')) return true;
    return false;
  }
}
