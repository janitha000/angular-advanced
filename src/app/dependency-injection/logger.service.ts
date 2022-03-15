import { Injectable } from '@angular/core';
import { Logger } from './logger.interface';

@Injectable()
export class LoggerService implements Logger {
    constructor() { }

    log(message: string): void {
        console.log('logger: ' + message)
    };

}

//useClass example
// @Injectable({
//     providedIn: 'root'
//     useClass : ExtendedLoggerService
// })