import { Directive, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appScrolltoinvalidfield]'
})
export class ScrolltoinvalidfieldDirective {

  @Input() form!: FormGroup; 

  constructor() { }

  @HostListener('submit', ['$event']) onSubmit(event: Event): void {
    console.log(this.form)
    if (this.form?.invalid) {
      for (const controlName in this.form.controls) {
        const control = this.form.get(controlName);
        console.log(control, control?.invalid, control?.touched)
        if (control && control.invalid) {
         
          const controlElement = document.querySelector(`[formControlName="${controlName}"]`) as HTMLElement;
          console.log(controlElement)
          if (controlElement) {
            controlElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center', 
            });
          }
          break; 
        }
  
      }
    }
  }

}
