import { Component, OnInit } from '@angular/core';

export interface User {
  name: string;
  age: number;
}

@Component({
  selector: 'app-custom-pipe',
  template: `<h3>Custom Pipe - Exponential</h3>
    <p>{{ 2 | exponential: 2 }}</p>
    <p>{{ 2 | exponential: 3 }}</p>
    <input type="text" [(ngModel)]="value" />
    <p>{{ 2 | exponential: value }}</p>
    <p>-----------------</p>
    <button (click)="onAddClick()">Add 1</button>
    <button (click)="onAddClick2()">Add 2</button>
    <div *ngFor="let user of users | impureFilter: 30">{{ user.name }}</div> `,
})
export class CustomPipeComponent implements OnInit {
  value: number = 1;
  users: User[] = [{ name: 'Janitha', age: 32 }];
  constructor() {}

  ngOnInit() {}

  onAddClick() {
    this.users.push({ name: 'Vindya', age: 33 });
  }

  onAddClick2() {
    this.users.push({ name: 'Lahiru', age: 29 });
  }
}

//pipes ignore change detection if it is not primitive (ex string, numbers will change)
//but objects will not trigger (add element to an array, add new property etc...)
//one way is to change the reference it self (immutable)
//or make pipe impure
