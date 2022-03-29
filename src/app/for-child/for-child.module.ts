import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForChildComponent } from './for-child.component';
import { PollModule } from './polling.module';

@NgModule({
  imports: [CommonModule, PollModule.forChild({ interval: 3000 })], //we can pass the interval value when the module is imported
  exports: [],
  declarations: [ForChildComponent],
  providers: [],
})
export class ForChildModule {}
