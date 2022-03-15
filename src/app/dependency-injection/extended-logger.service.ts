import { Injectable } from '@angular/core';
import { Logger } from './logger.interface';

@Injectable()
export class ExtendedLoggerService implements Logger {
    constructor() { }
    log(message: string): void {
        console.log('ELogger ' + message)
    }
}