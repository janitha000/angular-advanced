import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { UserService } from './user.service';

//laod the component only after all the side effects are done
//rather than showing loading on the child component, we can show loading even before and handle errors without going for child component
@Component({
    selector: 'app-resolve-guard',
    template: `<h3>This is resolve guard child</h3>
    <div *ngIf="(user$ | async) as user; else loading">{{user.name}}</div>
    <ng-template #loading><p>Loading....</p></ng-template>`
})

export class ResolveGuardComponent implements OnInit {
    id: string = '';
    user$!: Observable<User>;
    constructor(private route: ActivatedRoute, private userService: UserService) { }

    ngOnInit() {
        //normal way of getting result from http
        // this.user$ = this.route.params.pipe(
        //     map((params) => params?.['id']),
        //     switchMap((id) => this.userService.getUserById(id))
        // )


        //from this the loading will be not shown
        //component will be only shown after the user$ is loaded
        this.user$ = this.route.data.pipe(
            map(data => data?.['user'])
        )
    }
}

@Component({
    selector: 'app-resolve-parent',
    template: `<h4>This is resolve guard parent</h4>
    <router-outlet></router-outlet>`
})

export class ResolveGuardParentComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}

export interface User {
    name: string,
    age: number
}