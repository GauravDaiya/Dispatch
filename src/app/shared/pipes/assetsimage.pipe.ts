import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assetsimage'
})
export class AssetsimagePipe implements PipeTransform {

  transform(
    value: string,
    imageFrom: 'local'
  ): string {
    // Value is wrong
    if (!value) return '';
    let url = '';
    switch (imageFrom) {
      case 'local':
        url = this.fromLocals(value);
        break;
      default:
        url = this.fromLocals(value);
    }
    return url;
  }


  /**
   * Get Image from assets
   * @param value : string like image name
   * @returns : assets/images/image.png
   */

  public fromLocals(
    value: string
  ) {
    return 'assets/images/' + value;
  }

}
