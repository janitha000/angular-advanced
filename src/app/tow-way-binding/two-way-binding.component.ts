import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-two-way',
  template: `<p>Value from Child {{ inputSize }} <button (click)="onClick()">Change</button></p> `,
})
export class TwoWayComponent implements OnInit {
  @Input() inputSize!: number;
  @Output() inputSizeChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.inputSize = this.inputSize - 1;
    this.inputSizeChange.emit(this.inputSize);
  }
}

@Component({
  selector: 'app-two-way-parent',
  template: `<p>Value from parent {{ inputVar }}</p>
    <p>------------------</p>
    <app-two-way [inputSize]="inputVar" (inputSizeChange)="inputVar = $event"></app-two-way>
    <app-two-way [(inputSize)]="inputVar"></app-two-way>`,
})
export class TwoWayParentComponent implements OnInit {
  inputVar: number = 20;
  constructor() {}

  ngOnInit() {}
}
