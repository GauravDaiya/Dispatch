import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,  // The parent route
    children: [
      {
        path: 'customer',  // The child route
        loadChildren: () => import('./../customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'fleet-management',
        loadChildren: () => import('./../fleet-management/fleet-management.module').then(m=>m.FleetManagementModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
