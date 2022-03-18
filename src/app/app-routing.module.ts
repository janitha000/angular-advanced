import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './can-activate/auth.guard';
import { CanActivateChild1Component, CanActivateChild2Component, CanActivateComponent } from './can-activate/can-activate.component';
import { PermissionGuard } from './can-activate/permission.guard';
import { CanDeactivateComponent } from './can-deactivate/can-deactivate.component';
import { FormGuard } from './can-deactivate/form.guard';
import { DelayPreLoadStratergy } from './can-load/delay-pre-load-stratergy';
import { LoadGuard } from './can-load/load.guard';
import { PreLoadingStrategy } from './can-load/pre-loading-stratergy';
import { InteractionParentComponent } from './component-interaction.ts/interaction.component';
import { StyleParentComponent } from './component-styles/style.component';
import { ContentProjectionParentComponent } from './content-projection/content-projection.component';
import { CustomPipeComponent } from './custom-pipe/custom-pipe.component';
import { DependencyComponent } from './dependency-injection/dependency.component';
import { DynamicComponent } from './dynamic-loading/dynamic-loading.component';
import { HomeComponent } from './home/home.component';
import { LifecycleParentComponent } from './lifecycle/lifecycle.component';
import { TrackByComponent } from './ngfor-trackby/ngfor-trackby.component';
import { TemplateVariableComponent } from './template-variable/template-variable.component';
import { TwoWayParentComponent } from './tow-way-binding/two-way-binding.component';

const routes: Routes = [
  { path: 'component-interaction', component: InteractionParentComponent },
  { path: 'life-cycle', component: LifecycleParentComponent },
  { path: 'style', component: StyleParentComponent },
  { path: 'content', component: ContentProjectionParentComponent },
  { path: 'dynamic-loading', component: DynamicComponent },
  { path: 'custom-pipe', component: CustomPipeComponent },
  { path: 'two-way', component: TwoWayParentComponent },
  { path: 'template', component: TemplateVariableComponent },
  { path: 'dependency', component: DependencyComponent },
  { path: 'track-by', component: TrackByComponent },
  //Can Activate
  {
    path: 'can-activate',
    component: CanActivateComponent,
    canActivate: [AuthGuard],
    canActivateChild: [PermissionGuard],
    children: [
      {
        path: '',
        canActivateChild: [PermissionGuard],
        children: [
          { path: 'child-1', component: CanActivateChild1Component },
          { path: 'child-2', component: CanActivateChild2Component },
        ]
      },
      // { path: 'child-1', component: ListComponent }  A path which does not need permission gurad with canActivateChild
    ]
  },
  //Can Deactivate
  {
    path: 'can-deactivate',
    component: CanDeactivateComponent,
    canDeactivate: [FormGuard]
  },
  //Can Load
  {
    path: 'can-load',
    loadChildren: () => import('./can-load/can-load.module').then(m => m.CanLoadModule),
    // canLoad: [LoadGuard] will not work with preLoadingStrategy
    data: { preload: true, delay: 5000 } //optional, only need to delay-pre-load strategy
  },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreLoadingStrategy //custom loading strategy, only load lazy loaded modules if the user is logged in
    preloadingStrategy: DelayPreLoadStratergy //custom loading strategy, load with a delay mentioned in routes data
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
