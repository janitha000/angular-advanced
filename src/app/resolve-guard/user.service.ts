import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './resolve-guard.component';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor() {}

  getUserById(id: string): Observable<User> {
    let user: User = { name: 'Janitha', age: 32 };
    return of(user);
  }
}
