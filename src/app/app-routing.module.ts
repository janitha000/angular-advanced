import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InteractionParentComponent } from './component-interaction.ts/interaction.component';
import { StyleParentComponent } from './component-styles/style.component';
import { ContentProjectionParentComponent } from './content-projection/content-projection.component';
import { DynamicComponent } from './dynamic-loading/dynamic-loading.component';
import { HomeComponent } from './home/home.component';
import { LifecycleParentComponent } from './lifecycle/lifecycle.component';

const routes: Routes = [
  { path: 'component-interaction', component: InteractionParentComponent },
  { path: 'life-cycle', component: LifecycleParentComponent },
  { path: 'style', component: StyleParentComponent },
  { path: 'content', component: ContentProjectionParentComponent },
  { path: 'dynamic-loading', component: DynamicComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
