import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-reactive-form',
    template: `<form [formGroup]=userAccountForm (ngSubmit)="onSubmit()">
        <label for=""><span>Full Name</span><input type="text" formControlName="name" placeholder="Full Name"></label>
        <ng-container formGroupName=account>
            <label for=""><span>Email</span><input type="email" formControlName="email" placeholder="Email"></label>
            <label for=""><span>Confirm Email</span><input type="email" formControlName="confirm" placeholder="Confirm Email"></label>
        </ng-container>
        
        <button type="submit" [disabled]=userAccountForm.invalid>Submit</button>

        <div *ngIf="userAccountForm.get('name')?.hasError('required') && userAccountForm.get('name')?.touched"></div>
        <div><span>{{userAccountForm.value | json}}</span></div>
        <div><span>{{ userAccountForm.controls['name']?.errors | json }}</span></div>
    </form>
    <span>------------------------ With form builder-----------</span>
    <app-reactive-formbuilder></app-reactive-formbuilder>`
})

export class ReactiveFormComponent implements OnInit {
    userAccountForm!: FormGroup;

    constructor() { }

    ngOnInit() {
        this.userAccountForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(2)]),
            account: new FormGroup({
                email: new FormControl('', [Validators.required]),
                confirm: new FormControl('', [Validators.required])
            })
        })
    }

    //we can either pass the form values from the template
    // onSubmit({ value, valid }: { value: UserAccount, valid: boolean }) {
    //     console.log(value)
    // }

    onSubmit() {
        console.log(this.userAccountForm.value, this.userAccountForm.valid)
    }
}


@Component({
    selector: 'app-reactive-formbuilder',
    template: `<form [formGroup]=userAccountForm (ngSubmit)="onSubmit()">
    <label for=""><span>Full Name</span><input type="text" formControlName="name" placeholder="Full Name"></label>
    <ng-container formGroupName=account>
        <label for=""><span>Email</span><input type="email" formControlName="email" placeholder="Email"></label>
        <label for=""><span>Confirm Email</span><input type="email" formControlName="confirm" placeholder="Confirm Email"></label>
    </ng-container>
    
    <button type="submit" [disabled]=userAccountForm.invalid>Submit</button>

    <div *ngIf="userAccountForm.get('name')?.hasError('required') && userAccountForm.get('name')?.touched"></div>
    <div><span>{{userAccountForm.value | json}}</span></div>
    <div><span>{{ userAccountForm.controls['name']?.errors | json }}</span></div>
</form>`
})

export class ReactiveWithFormBuilderComponent implements OnInit {
    userAccountForm!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.userAccountForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            account: this.fb.group({
                email: ['', [Validators.required]],
                confirm: ['', [Validators.required]]
            })
        })
    }

    onSubmit() {
        console.log(this.userAccountForm.value, this.userAccountForm.valid)
    }
}

interface UserAccount {
    name: string,
    account: {
        email: string,
        confirm: string
    }
}