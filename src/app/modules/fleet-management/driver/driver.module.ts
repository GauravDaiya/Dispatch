import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { PaginationModule } from '../../../shared/modules/pagination/pagination.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { DriverStore } from '../store-services/driver.store';
import { CreateDriverComponent } from './components/create-driver/create-driver.component';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { CustomeSwitchToggleModule } from '../../../shared/modules/custome-switch-toggle/custome-switch-toggle.module';


@NgModule({
  declarations: [
    DriverListComponent,
    CreateDriverComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    MaterialModule,
    PaginationModule,
    NgxMaskDirective,
    NgxMaskPipe,
    PipesModule,
    DirectivesModule,
    CustomeSwitchToggleModule
  ],
  providers: [
    provideNgxMask(),
    DriverStore
  ]
})
export class DriverModule { }
