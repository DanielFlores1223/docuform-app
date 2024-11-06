import { Component, inject, signal } from '@angular/core';
import { ResponsiveService } from '../../../material/services/responsive.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegisterUserPayload } from 'global-interfaces';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../../shared/services/alerts.service';



@Component({
  templateUrl: './signup-page.component.html',
  styleUrls: ['../../auth.styles.css', './signup-page.component.css']
})
export class SignupPageComponent {
  public hide = signal(true);
  public layout = inject(ResponsiveService);
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject (Router);
  private _alertService = inject(AlertsService);


  public signUpForm: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(6), Validators.pattern( /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]]
  });

  public clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
    event.preventDefault();
  }

  public onSubmit() {
    if(this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const payload = this.signUpForm.value as IRegisterUserPayload;

    this._authService.signup(payload).subscribe({
      next: () => this._router.navigateByUrl('/my-forms'),
      error: (err) => this._alertService.errorApi(err)
    });

  }

  public getFormErrors(field: keyof IRegisterUserPayload) {
    return this.signUpForm.get(field)?.errors
  }
}
