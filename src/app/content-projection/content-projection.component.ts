import { Component, HostBinding, OnInit } from '@angular/core';

//Single slot projection
//Multi slot projection

@Component({
  selector: 'app-projection',
  template: `<h3>Single Slot Content Projection</h3>
    Default: <ng-content></ng-content> Select:
    <ng-content select="[selector]"></ng-content>
    <!-- <div *ngIf=show><ng-content [NgTemplateOutlet]=content.TemplateRef></ng-content></div> -->
    <button (click)="onClick()">ChangeTemplate</button> `,
})
export class ContentProjectionComponent implements OnInit {
  show: boolean = false;
  constructor() {}

  ngOnInit() {}

  onClick() {
    this.show = !this.show;
  }
}

//class base content projection
@Component({
  selector: 'app-card',
  template: `<div>
    <h5>This is card component</h5>
    <ng-content select=".header"></ng-content>
    <ng-content select=".body"></ng-content>
    <button (click)="onClick()">Make component hidden</button>
  </div>`,
})
export class CardComponent implements OnInit {
  @HostBinding('style.visibility') visibility = 'visible';

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.visibility = 'hidden';
  }
}

@Component({
  selector: 'app=projection-parent',
  template: `<app-projection>
      <h4 selector>This is for selector</h4>
      <p>This is from parent</p>
      <!-- <ng-template appExampleZippyContent>
            It depends on what you do with it.
        </ng-template> -->
    </app-projection>
    <p>-------------------</p>
    <app-card>
      <div class="header">This is the header from parent</div>
      <div class="body">This is the body from parent</div>
    </app-card> `,
})
export class ContentProjectionParentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
