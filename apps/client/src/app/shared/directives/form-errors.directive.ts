import { Directive, ElementRef, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[formErrors]'
})
export class FormErrorsDirective {

  private htmlElement?: ElementRef<HTMLElement>;
  private _errors?: ValidationErrors | null;

  @Input()
  set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(
    private hostElement: ElementRef<HTMLElement>
  ) {
    this.htmlElement = this.hostElement;

  }

  setErrorMessage(): void {
    if(!this.htmlElement) return;
    if(!this._errors) {
      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys(this._errors);

    if(errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'this field is required';
      return;
    }

    if(errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength']

      this.htmlElement.nativeElement.innerText = `Min ${current} / ${min} characters`;
      return;
    }

    if(errors.includes('maxlength')) {
      const max = this._errors!['maxlength']['requiredLength'];
      const current = this._errors!['maxlength']['actualLength']

      this.htmlElement.nativeElement.innerText = `Min ${current} / ${max} characters`;
      return;
    }

    if(errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'Incorrect email format';
      return;
    }

    if(errors.includes('pattern')) {
      const pattern = this._errors!['pattern']['requiredPattern'];

      // password
      if(pattern === '/(?:(?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$/') { 
        this.htmlElement.nativeElement.innerText = 'The password must have a Uppercase, lowercase letter and a number';
        return;
      }

      return;
    }

  }

}
