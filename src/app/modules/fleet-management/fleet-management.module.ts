import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetManagementRoutingModule } from './fleet-management-routing.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FleetManagementRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class FleetManagementModule { }
