import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { NavigationsComponent } from './navigations/navigations.component';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { MaterialModule } from '../../shared/material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { DeviceDetectService } from '../../core/services/device-detect.service';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    NavigationsComponent
  ],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
    PipesModule,
    MaterialModule,
    LayoutModule,
  ],
  providers: [DeviceDetectService]
})
export class AppLayoutModule { }
