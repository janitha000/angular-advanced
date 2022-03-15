import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoadGuard implements CanLoad {
    constructor() { }

    canLoad(route: Route) {
        return true;
    }
}

//Used in app-routing.module.ts
