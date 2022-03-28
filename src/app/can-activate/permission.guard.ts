import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivateChild {
  isPermission: boolean = false;
  constructor(private router: Router) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isPermission ? true : this.router.createUrlTree(['can-activate']);
  }
}
