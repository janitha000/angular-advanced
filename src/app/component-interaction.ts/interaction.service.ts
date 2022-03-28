import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable(
  { providedIn: 'root' }, //if we want this to lazy load, remove this and add only in @ngModule providers array
)
export class InteractionService {
  private messageSource = new Subject<string>();
  testVar: boolean = false;

  messageObs$ = this.messageSource.asObservable();

  constructor() {}

  sendMessage(message: string) {
    this.messageSource.next(message);
  }
}
