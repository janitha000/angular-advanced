//How DI Resolved
//Element tree -> module tree -> null injector

import { Component, Inject, Injector, OnInit } from '@angular/core';
import { AppConfig, APP_CONFIG } from './config.token';
import { ExtendedLoggerService } from './extended-logger.service';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-dependancy',
  template: ``,
  // providers: [LoggerService]  //normal DI
  // providers: [{ provide: LoggerService, useClass: ExtendedLoggerService }] use different class
  //providers: [{ provide: LoggerService, useExisting: ExtendedLoggerService }] use an already existing logger rather than creating new

  providers: [
    {
      provide: LoggerService,
      useFactory: (injector: Injector) => {
        return injector.get(APP_CONFIG).enabled ? injector.get(ExtendedLoggerService) : injector.get(LoggerService);
      },
      deps: [Injector],
    },
  ],
  //provide class on runtime based on a dependency value
  //inject deps using inject tokens which will be available in factory

  //use multi : true when you want multiple services with the same injection token
})
export class DependencyComponent implements OnInit {
  constructor(private logger: LoggerService, @Inject(APP_CONFIG) private config: AppConfig) {
    console.log('AppConfig val: ' + config.enabled);
  }

  ngOnInit() {
    this.logger.log('Init');
  }
}
