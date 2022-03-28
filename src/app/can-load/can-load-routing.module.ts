import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../can-activate/auth.guard';
import { CanLoadComponent } from './can-load.component';

const routes: Routes = [
  {
    path: '',
    component: CanLoadComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanLoadRoutingModule {}
