import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphaNumeric]'
})
export class AlphanumericDirective {

  constructor(private el: ElementRef) { }

  private regex: RegExp = new RegExp(/^[^-\s][A-Z0-9\s@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*$/i);

  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
   
    const next = this.el.nativeElement.value + event.key;
    if (!next.match(this.regex)) {
      event.preventDefault();
    }
  }
}
