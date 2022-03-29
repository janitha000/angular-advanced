import { Component, ContentChild, HostBinding, OnInit } from '@angular/core';
import { Card } from './card.interface.';
import { CARD } from './card.token';

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
//along with bridge pattern
@Component({
  selector: 'app-card',
  template: `<div>
    <h5>This is card component</h5>
    <ng-content select=".header"></ng-content>
    <ng-content select=".body"></ng-content>
    <ng-content></ng-content>
    <button (click)="onClick()">Make component hidden</button>
    <button (click)="onDisableClick()">Disable Card</button>
  </div>`,
  //when requesting CARD token return our card component
  //can use same token in different components as well
})
export class CardComponent implements OnInit {
  @HostBinding('style.visibility') visibility = 'visible';
  @ContentChild(CARD, { static: true }) card!: Card; //make static true if we want to access in ngOnInit

  constructor() {}
  disable() {
    this.visibility = this.visibility = 'hidden' ? 'visible' : 'hidden';
  }

  ngOnInit() {}

  onClick() {
    this.visibility = 'hidden';
  }

  onDisableClick() {
    this.card.disable();
  }
}

//Use bridge pattern where we can access dynamic child components with content-projection
//Create inject token CARD which will used by all the child components which implements the Card interface
//using @ContentChild then parent can trigger anything which are inside the child
@Component({
  selector: 'app-card-child',
  template: `<p>This is app card child</p>
    <ng-content></ng-content>`,
  providers: [
    {
      provide: CARD,
      useExisting: CardChildComponent,
    },
  ],
})
export class CardChildComponent implements OnInit, Card {
  @HostBinding('style.visibility') visibility = 'visible';

  constructor() {}
  onClick() {}
  disable() {
    this.visibility = this.visibility === 'hidden' ? 'visible' : 'hidden';
  }

  ngOnInit() {}
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
    </app-card>

    <app-card>
      <app-card-child></app-card-child>
    </app-card>`,
})
export class ContentProjectionParentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
