import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-value-accessor',
  template: `<form [formGroup]="form" (ngSubmit)="onSubmit()">
    <input type="text" formControlName="itemName" />

    <div><app-disable formControlName="formDisabled"></app-disable></div>
    <button type="submit" [disabled]="form.controls['formDisabled'].value">Submit</button>
  </form> `,
})
export class ValueAccessorComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      itemName: [''],
      formDisabled: [false],
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}

@Component({
  selector: 'app-disable',
  template: `<p>--------------</p>
    <button (click)="onClick()">Change State</button>
    <p>{{ value }}</p>
    <p>------------------</p>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DisableComponent,
      multi: true,
    },
  ],
})
export class DisableComponent implements OnInit, ControlValueAccessor {
  value: boolean = false;
  onChange!: (value: boolean) => void;
  onTouch!: () => void;
  constructor() {}

  writeValue(obj: boolean): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit() {}

  onClick() {
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouch();
  }
}
