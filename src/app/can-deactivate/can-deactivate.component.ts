import { Component, OnInit } from '@angular/core';
import { CanForm } from './form.interface';

@Component({
  selector: 'app-deactivate',
  template: `<h5>This is can deactivate component</h5>
    <p>Can go home value : {{ canGoHome }}</p>
    <button (click)="onClick()">Click</button>
    <p><a routerLink="/">Home</a></p> `,
})
export class CanDeactivateComponent implements OnInit, CanForm {
  canGoHome: boolean = false;
  constructor() {}

  ngOnInit() {}

  onClick() {
    this.canGoHome = !this.canGoHome;
  }
}
