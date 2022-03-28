import { Component, OnInit } from '@angular/core';

//:host - apply to current component
//:host-context apply based on parents style class

@Component({
  selector: 'app-style',
  template: `<p>child</p>`,
  styles: [
    `
      :host {
        font-style: italic;
      }
    `,
    `
      :host-context(.active) {
        font-weight: bold;
      }
    `,
  ],
})
export class StyleComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

@Component({
  selector: 'app-style-parent',
  template: `<div [ngClass]="isActive ? 'active' : 'not-active'">Parent</div>
    <button (click)="onClick()">ChangeClass</button>
    <p>---------------------</p>
    <app-style></app-style> `,
})
export class StyleParentComponent implements OnInit {
  isActive: boolean = false;
  constructor() {}

  ngOnInit() {}

  onClick() {
    this.isActive = !this.isActive;
  }
}
