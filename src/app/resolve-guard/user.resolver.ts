import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, delay, EMPTY, Observable } from 'rxjs';
import { User } from './resolve-guard.component';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> | Promise<User> | User {
        return this.userService.getUserById(route.params?.['id']).pipe(
            delay(4000),
            catchError(() => {
                this.router.navigate([''])
                return EMPTY
            })
        );
    }
}