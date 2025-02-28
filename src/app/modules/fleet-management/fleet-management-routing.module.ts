import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'fleet',
    loadChildren: () => import('./fleet/fleet.module').then(m=>m.FleetModule)
  },
  {
    path: 'drivers',
    loadChildren: () => import('./driver/driver.module').then(m=>m.DriverModule)
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./vehicles/vehicles.module').then(m=>m.VehiclesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetManagementRoutingModule { }
