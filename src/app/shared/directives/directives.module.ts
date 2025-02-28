import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizeDirective } from './capitalize.directive';
import { AlphabetsDirective } from './alphabets.directive';
import { AlphanumericDirective } from './alphanumeric.directive';
import { ScrolltoinvalidfieldDirective } from './scrolltoinvalidfield.directive';



@NgModule({
  declarations: [
    CapitalizeDirective,
    AlphabetsDirective,
    AlphanumericDirective,
    ScrolltoinvalidfieldDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CapitalizeDirective,
    AlphabetsDirective,
    AlphanumericDirective,
    ScrolltoinvalidfieldDirective
  ]
})
export class DirectivesModule { }
