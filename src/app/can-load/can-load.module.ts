import { NgModule } from '@angular/core';
import { CanLoadRoutingModule } from './can-load-routing.module';
import { CanLoadComponent } from './can-load.component';

@NgModule({
  imports: [CanLoadRoutingModule],
  exports: [],
  declarations: [CanLoadComponent],
  providers: [],
})
export class CanLoadModule {}
