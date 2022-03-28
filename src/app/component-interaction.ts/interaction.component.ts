import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { InteractionService } from './interaction.service';

//@Input()
//Input() with alias
//Use local var #child
//Use ViewChild
//Use Service(with subject)

@Component({
  selector: 'app-interaction',
  template: `<p>{{ userName }}</p>
    <p>{{ age }}</p>
    <button class="button" (click)="sendMessage()">Send Message Child</button> `,
})
export class InteractionComponent implements OnInit {
  @Input('name') userName: string = '';
  @Input()
  get age(): number {
    return this._age;
  }
  set age(age: number) {
    this._age = age && age * 2;
  }
  localVariable: string = 'ChildVar';
  viewChildVariable: string = 'ChildViewChild';
  private count = 0;
  private _age = 0;

  constructor(private interactionService: InteractionService) {}

  ngOnInit() {}

  onChangeLocalVar() {
    this.localVariable = 'changedChildVar';
  }

  sendMessage() {
    this.count = this.count + 1;
    this.interactionService.sendMessage('This is from child ' + this.count);
  }
}

@Component({
  selector: 'app-interaction-parent',
  template: `
    <p>{{ child.localVariable }}</p>
    <button (click)="child.onChangeLocalVar()">Change Child Var</button>
    <p>Message from child {{ childMsg }}</p>
    -----------------
    <app-interaction [name]="name" [age]="age" #child></app-interaction>
  `,
})
export class InteractionParentComponent implements OnInit {
  name: string = 'Janitha';
  age: number = 10;
  childVar: string = '';
  childMsg: string = '';

  messageObs$!: Subscription;

  @ViewChild(InteractionComponent)
  private childComponent!: InteractionComponent;
  constructor(private interactionService: InteractionService) {
    this.messageObs$ = this.interactionService.messageObs$.subscribe((message) => {
      this.childMsg = message;
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    console.log(this.childComponent.viewChildVariable);
  }

  ngOnDestry() {
    this.messageObs$.unsubscribe();
  }
}
