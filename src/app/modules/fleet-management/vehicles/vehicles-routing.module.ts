import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { CreateTruckComponent } from './components/create-truck/create-truck.component';
import { CreateTrailerComponent } from './components/create-trailer/create-trailer.component';
import { CreateContainerComponent } from './components/create-container/create-container.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleListComponent
  },
  {
    path: 'create-truck',
    component: CreateTruckComponent
  },
  {
    path: 'create-trailer',
    component: CreateTrailerComponent
  },
  {
    path: 'create-container',
    component: CreateContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
