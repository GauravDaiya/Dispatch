import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FleetListComponent } from './components/fleet-list/fleet-list.component';

const routes: Routes = [
  {
    path: '',
    component: FleetListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule { }
