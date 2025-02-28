import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphabet]'
})
export class AlphabetsDirective {

  constructor(private el: ElementRef) { }

  private regex: RegExp = new RegExp(/^[A-Z\s@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,’-]*$/i);

  private specialKeys: Array<string> = ['Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight'];

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {

    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    if (this.el.nativeElement.selectionStart === 0 && event.key === ' ') {
      event.preventDefault();
      return;
    }
    const next = this.el.nativeElement.value + event.key;
    if (!next.match(this.regex)) {
      event.preventDefault();
    }
  }

}
