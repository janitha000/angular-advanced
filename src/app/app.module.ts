import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InteractionComponent, InteractionParentComponent } from './component-interaction.ts/interaction.component';
import { InteractionService } from './component-interaction.ts/interaction.service';
import { StyleComponent, StyleParentComponent } from './component-styles/style.component';
import { CardChildComponent, CardComponent, ContentProjectionComponent, ContentProjectionParentComponent } from './content-projection/content-projection.component';
import { CustomPipeComponent } from './custom-pipe/custom-pipe.component';
import { ExponentialPipe } from './custom-pipe/exponential.pipe';
import { DynamicComponent, DynamicFactoryComponent, DynamicOneComponent, DynamicTwoComponent } from './dynamic-loading/dynamic-loading.component';
import { DynamicDirective } from './dynamic-loading/dynamic.directive';
import { HomeComponent } from './home/home.component';
import { LifecycleComponent, LifecycleParentComponent } from './lifecycle/lifecycle.component';
import { ImpureFilterPipe } from './custom-pipe/impure-filter.pipe';
import { TwoWayComponent, TwoWayParentComponent } from './tow-way-binding/two-way-binding.component';
import { TemplateVariableComponent } from './template-variable/template-variable.component';
import { CanActivateChild1Component, CanActivateChild2Component, CanActivateComponent } from './can-activate/can-activate.component';
import { CanDeactivateComponent } from './can-deactivate/can-deactivate.component';
import { DependencyComponent } from './dependency-injection/dependency.component';
import { TrackByComponent } from './ngfor-trackby/ngfor-trackby.component';
import { CustomDirectivesComponent, TTClassDirective, UnlessDirective } from './custom-directives/custom.directive';
import { AsyncPipeComponent } from './async-pipe/async-pipe.component';
import { ResolveGuardComponent, ResolveGuardParentComponent } from './resolve-guard/resolve-guard.component';
import { UserResolver } from './resolve-guard/user.resolver';
import { NamedOutletComponent } from './named-outlets/named-outlet.component';
import { ReactiveFormComponent, ReactiveWithFormBuilderComponent } from './reactive-forms/reactive-forms.component';
import { TestComponent } from './testing/test/test.component';
import { ViewChidComponent, ViewParentComponent } from './view-child/view-child.component';
import { DisableComponent, ValueAccessorComponent } from './reactive-forms/value-accessor/value-accessor.component';
import { ForChildComponent } from './for-child/for-child.component';
import { ForChildModule } from './for-child/for-child.module';
import { RxjsComponent } from './rxjs/rxjs.component';
import { HttpClientModule } from '@angular/common/http';

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
    CanDeactivateComponent,
    DependencyComponent,
    TrackByComponent,
    CustomDirectivesComponent,
    TTClassDirective,
    UnlessDirective,
    AsyncPipeComponent,
    ResolveGuardComponent,
    ResolveGuardParentComponent,
    NamedOutletComponent,
    ReactiveFormComponent,
    ReactiveWithFormBuilderComponent,
    TestComponent,
    ViewChidComponent,
    ViewParentComponent,
    CardComponent,
    DynamicFactoryComponent,
    ValueAccessorComponent,
    DisableComponent,
    CardChildComponent,
    RxjsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule, ForChildModule, HttpClientModule],
  providers: [InteractionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
