import { Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  template: `<p>Name : {{ name }}</p>
    <p>Age : {{ age }}</p>
    <p>{{ log }}</p>
    <button (click)="onClick()">Change from Child</button> `,
})
export class LifecycleComponent implements OnInit {
  @Input() name: string = '';
  @Input() age: number = 0;
  @Input() dog!: Dog;
  log: string = '';

  constructor() {}

  ngOnInit() {
    //perform complex initializations outside the constructor (call apis etc...)
    //setup component after angular sets the @Input properties (ngOnChanges called before but it will be called multiple times)
    this.log = this.log + 'ngOnInit called | ';
  }

  ngOnDestroy() {
    //free resources that would not garbage collected automatically
    // observables -> unsubscribe, stop interval timers
    //notify others that this component will go away
    console.log('ngOnDestroy called');
  }

  ngOnChanges(changes: SimpleChange) {
    console.log(changes);
    this.log = this.log + 'ngOnChanges called | ';
  }

  onClick() {
    this.name = 'Lahiru';
  }
}

@Component({
  selector: 'app-lifecycle-parent',
  template: `<h3>This is the lifecycle parent component</h3>
    <button (click)="onClick()">Change Name</button>
    <button (click)="onClickAge()">Change Age</button>
    <button (click)="onClickDog()">Change Dog Age</button>
    <button (click)="onClickDogNew()">Change Dog Age New</button>
    <app-lifecycle [name]="name" [age]="age" [dog]="dog"></app-lifecycle> `,
})
export class LifecycleParentComponent implements OnInit {
  name: string = 'Janitha';
  age: number = 28;
  dog!: Dog;
  @ViewChild(LifecycleComponent) viewChild!: LifecycleComponent;

  constructor() {
    this.dog = { age: 15 };
  }

  ngOnInit() {
    console.log('ngOnInit called');
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    console.log('child view initialised');
  }

  ngAfterViewChecked() {
    // viewChild is updated after the view has been checked
    if (this.name === this.viewChild.name) console.log('no rerender needs to be done');
    else {
      console.log('change');
    }
  }

  onClick() {
    this.name = 'Vindya';
  }
  onClickAge() {
    this.age = 32;
  }

  onClickDog() {
    //this will not trigger ngOnChanges since the reference to the object is not changed
    this.dog.age = 12;
  }

  onClickDogNew() {
    this.dog = { age: 12 };
  }
}

interface Dog {
  age: number;
}
