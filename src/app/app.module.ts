import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
import { TwoWayComponent, TwoWayParentComponent } from './tow-way-binding/two-way-binding.component';
import { TemplateVariableComponent } from './template-variable/template-variable.component';
import { CanActivateChild1Component, CanActivateChild2Component, CanActivateComponent } from './can-activate/can-activate.component';
import { CanDeactivateComponent } from './can-deactivate/can-deactivate.component';

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
    CustomPipeComponent,
    TwoWayComponent,
    TwoWayParentComponent,
    TemplateVariableComponent,
    CanActivateChild1Component,
    CanActivateChild2Component,
    CanActivateComponent,
    CanDeactivateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [InteractionService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
