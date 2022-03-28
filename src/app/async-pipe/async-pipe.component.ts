import { Component, OnInit } from '@angular/core';
import { Observable, of, shareReplay } from 'rxjs';

@Component({
  selector: 'app-async-pipe',
  template: `<p>Normal Async Pipe</p>
    {{ obsValue | async }}
    <p>--------</p>
    <h4>ngIf Example</h4>
    <div *ngIf="obsNgIfValue | async; else elseblock">
      {{ obsNgIfValue | async }}
    </div>
    <ng-template #elseblock><p>Observable is still loading</p></ng-template>
    <h4>NgIf with as Example - no need for shareReplay</h4>
    <div *ngIf="obsValue | async as value; else elseblock">{{ value }}</div>
    <h4>NgFor</h4>
    <ul>
      <li *ngFor="let breed of (dogsObs | async)?.message">{{ breed }}</li>
    </ul>
    <p>Key Value Pipe</p>
    <ul>
      <li *ngFor="let item of user | keyvalue">{{ item.key }} --> {{ item.value }}</li>
    </ul>`,
})
export class AsyncPipeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  obsValue = new Observable((obs) => {
    setTimeout(() => {
      obs.next('1000');
    }, 1000);
  });

  //with shareReplay share the subscrbed values
  //otherwise in ngIf, observable will be called two times
  obsNgIfValue = new Observable((obs) => {
    setTimeout(() => {
      obs.next('1000');
    }, 1000);
  }).pipe(shareReplay());

  //otherwise we can use in ngIf using as keyword.

  dogs: dogs = { message: ['afghan', 'basset', 'blood'] };
  dogsObs = of(this.dogs);

  //keyvalue pipe
  //used when iterating through object properties (without having an array)
  //default sorting is alphetic / or numerical if key is a number
  //can give a custom sorting function
  user: User = { name: 'Janitha', age: 31, city: 'Kandy' };
}

interface dogs {
  message: string[];
}

interface User {
  name: string;
  age: number;
  city: string;
}
