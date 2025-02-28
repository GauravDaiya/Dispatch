import { Pipe, PipeTransform } from '@angular/core';
import { iconConfig } from './../../core/config/svg-icons-config'
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  transform(
    value: Partial<keyof typeof iconConfig>,
  ): any {
    if (!value) return '';
    return this.domSanitizer.bypassSecurityTrustHtml(iconConfig[value])
  }

}
