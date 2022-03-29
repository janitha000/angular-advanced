import { Component, Host, OnInit, Optional, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-child',
  template: `<p>{{ counter }}</p>
    <button (click)="onClick()">Change parent Header</button>`,
})
export class ViewChidComponent implements OnInit {
  counter: number = 1;
  //Directly access parent component
  //@Host used to limit only for parent
  //constructor(private parent:ParentComponent, private grandParent:AppComponent) { } when not using @Host
  constructor(@Optional() @Host() private parent: ViewParentComponent) {}

  ngOnInit() {}

  onClick() {
    this.parent.header = 'Header from child';
  }
}

@Component({
  selector: 'app-view-parent',
  template: `<h3>{{ header }}</h3>
    <button (click)="onChildOneClick()">Change child one</button>
    <button (click)="onChildTwoClick()">Change child two</button>
    <app-view-child #child1></app-view-child>
    <app-view-child #child2></app-view-child>`,
})
export class ViewParentComponent implements OnInit {
  @ViewChild('child1', { static: false }) childOne!: ViewChidComponent;
  @ViewChild('child2', { static: false }) childTwo!: ViewChidComponent;
  header: string = 'Parent Header';
  constructor() {}

  ngOnInit() {}

  onChildOneClick() {
    this.childOne.counter += 1;
  }

  onChildTwoClick() {
    this.childTwo.counter += 1;
  }
}
