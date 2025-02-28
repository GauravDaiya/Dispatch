import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { PaginationModule } from '../../../shared/modules/pagination/pagination.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { CreateTruckComponent } from './components/create-truck/create-truck.component';
import { FleetStore } from '../store-services/fleet.store';
import { FuelTypeStore } from '../store-services/fuelType.store';
import { PlateTypeStore } from '../store-services/plateType.store';
import { DriverStore } from '../store-services/driver.store';
import { VehicleStore } from '../store-services/vehicle.store';
import { CreateTrailerComponent } from './components/create-trailer/create-trailer.component';
import { CreateContainerComponent } from './components/create-container/create-container.component';


@NgModule({
  declarations: [
    VehicleListComponent,
    CreateTruckComponent,
    CreateTrailerComponent,
    CreateContainerComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    MaterialModule,
    PaginationModule,
    NgxMaskDirective,
    NgxMaskPipe,
    PipesModule,
    DirectivesModule
  ],
  providers: [
    FleetStore,
    FuelTypeStore,
    PlateTypeStore,
    DriverStore,
    VehicleStore,
    provideNgxMask(),
  ]
})
export class VehiclesModule { }
