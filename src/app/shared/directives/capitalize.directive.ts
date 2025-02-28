import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[capitalize]'
})
export class CapitalizeDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input',['$event']) onInput($event:any) {
    console.log($event.target.value.charAt(0));
    if($event.target.value.charAt(0) !== ' ') {
      this.el.nativeElement.value = $event.target.value.charAt(0).toUpperCase() + $event.target.value.substring(1);
    } else { 
      this.el.nativeElement.value = $event.target.value = $event.target.value.substring(1);
    }
    
  }
}
