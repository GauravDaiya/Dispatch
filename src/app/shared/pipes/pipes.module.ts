import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsimagePipe } from './assetsimage.pipe';
import { IconPipe } from './icon.pipe';



@NgModule({
  declarations: [
    AssetsimagePipe,
    IconPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AssetsimagePipe,
    IconPipe
  ]
})
export class PipesModule { }
