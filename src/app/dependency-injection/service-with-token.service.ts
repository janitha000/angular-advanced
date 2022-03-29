import { Inject, Injectable, InjectionToken } from '@angular/core';

//when we have providedIn root since it will always create a singleton we cannot pass different config values
// @Injectable({ providedIn: 'root' })
//to tackle this the previous solution was forRoot and forChild
@Injectable({ providedIn: 'any' })
//with any for lazy loaded modules will have their own instance(only for lazy loaded modules)
//modules which are eargely loaded will have the same instance with same config values
export class ServiceWithTokenService {
  constructor(@Inject(SERVICE_CONFIG) private config: ServiceConfig) {}

  getEndpoint() {
    console.log(this.config.endpoint);
  }
}

interface ServiceConfig {
  endpoint: string;
  timeOut: number;
  isRetry: boolean;
}

export const SERVICE_CONFIG = new InjectionToken<ServiceConfig>('service_token');

export const devConfig: ServiceConfig = {
  endpoint: 'aaaa',
  isRetry: false,
  timeOut: 1000,
};

//in module where the service will be used
// providers: [{provide:  SERVICE_CONFIG , useValue: devConfig}]
//providing only the token, not the service - so it can be shakeable
