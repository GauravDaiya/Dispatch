import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { CreateDriverComponent } from './components/create-driver/create-driver.component';

const routes: Routes = [
  {
    path: '',
    component: DriverListComponent
  },
  {
    path: "create-driver",
    component: CreateDriverComponent
  },
  {
    path: "edit-driver/:id",
    component: CreateDriverComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
