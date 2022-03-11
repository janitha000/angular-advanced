import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InteractionComponent, InteractionParentComponent } from './component-interaction.ts/interaction.component';
import { InteractionService } from './component-interaction.ts/interaction.service';
import { StyleComponent, StyleParentComponent } from './component-styles/style.component';
import { ContentProjectionComponent, ContentProjectionParentComponent } from './content-projection/content-projection.component';
import { CustomPipeComponent } from './custom-pipe/custom-pipe.component';
import { ExponentialPipe } from './custom-pipe/exponential.pipe';
import { DynamicComponent, DynamicOneComponent, DynamicTwoComponent } from './dynamic-loading/dynamic-loading.component';
import { DynamicDirective } from './dynamic-loading/dynamic.directive';
import { HomeComponent } from './home/home.component';
import { LifecycleComponent, LifecycleParentComponent } from './lifecycle/lifecycle.component';
import { ImpureFilterPipe } from './custom-pipe/impure-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LifecycleComponent,
    LifecycleParentComponent,
    InteractionParentComponent,
    InteractionComponent,
    StyleComponent,
    StyleParentComponent,
    ContentProjectionComponent,
    ContentProjectionParentComponent,
    DynamicComponent,
    DynamicOneComponent,
    DynamicTwoComponent,
    DynamicDirective,
    ExponentialPipe,
    ImpureFilterPipe,
    CustomPipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [InteractionService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
