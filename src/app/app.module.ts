import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InteractionComponent, InteractionParentComponent } from './component-interaction.ts/interaction.component';
import { InteractionService } from './component-interaction.ts/interaction.service';
import { StyleComponent, StyleParentComponent } from './component-styles/style.component';
import { ContentProjectionComponent, ContentProjectionParentComponent } from './content-projection/content-projection.component';
import { DynamicComponent, DynamicOneComponent, DynamicTwoComponent } from './dynamic-loading/dynamic-loading.component';
import { DynamicDirective } from './dynamic-loading/dynamic.directive';
import { HomeComponent } from './home/home.component';
import { LifecycleComponent, LifecycleParentComponent } from './lifecycle/lifecycle.component';

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
    DynamicDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [InteractionService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
