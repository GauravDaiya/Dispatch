import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomeSwitchToggleComponent } from './components/custome-switch-toggle/custome-switch-toggle.component';
import { MaterialModule } from '../../material/material.module';




@NgModule({
  declarations: [
    CustomeSwitchToggleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CustomeSwitchToggleComponent
  ]
})
export class CustomeSwitchToggleModule { }
