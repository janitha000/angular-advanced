import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app=projection-parent',
  template: `<app-projection>
      <h4 selector>This is for selector</h4>
      <p>This is from parent</p>
      <!-- <ng-template appExampleZippyContent>
            It depends on what you do with it.
        </ng-template> -->
    </app-projection>
    <p>-------------------</p> `,
})
export class ContentProjectionParentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
