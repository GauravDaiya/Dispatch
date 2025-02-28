import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetRoutingModule } from './fleet-routing.module';
import { FleetListComponent } from './components/fleet-list/fleet-list.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { PaginationModule } from '../../../shared/modules/pagination/pagination.module';
import { AddFleetComponent } from './components/add-fleet/add-fleet.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { FleetStore } from '../store-services/fleet.store';
import { DirectivesModule } from '../../../shared/directives/directives.module';


@NgModule({
  declarations: [
    FleetListComponent,
    AddFleetComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    FleetRoutingModule,
    MaterialModule,
    PaginationModule,
    NgxMaskDirective,
    NgxMaskPipe,
    PipesModule,
    DirectivesModule
  ],
  providers: [
    FleetStore,
    provideNgxMask(),
  ]
})
export class FleetModule { }
