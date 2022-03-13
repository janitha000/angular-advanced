import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-template',
    template: `<input type="text" #phone>
        <button (click)=setPhone(phone.value)>Set Phone</button>
        <p>Phone no: {{phoneNo}}</p>
    `
})

export class TemplateVariableComponent implements OnInit {
    phoneNo: string = '';

    constructor() { }

    ngOnInit() { }

    setPhone(phone: string) {
        this.phoneNo = phone;
    }
}

//Can use with ngForm <form #itemForm="ngForm" (ngSubmit)="onSubmit(itemForm)">
//disable button if itemForm.form.valid