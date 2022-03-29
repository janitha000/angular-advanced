import { ModuleWithProviders, NgModule } from '@angular/core';
import { INTERVAL, PollingConfig, PollingService } from './polling.service';

//forChild solves where we need same singleton service in lazy loaded modules as well
//if service have providedIn: root it will anyway be singleton
//

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [],
})
export class PollModule {
  //should be used in lazy loaded modules
  //for eager loaded module use forRoot()
  static forChild(config: PollingConfig): ModuleWithProviders<PollModule> {
    return {
      ngModule: PollModule,
      providers: [
        PollingService,
        {
          provide: INTERVAL,
          useValue: config.interval || 1000, //inject interval if provided
        },
      ],
    };
  }
}
