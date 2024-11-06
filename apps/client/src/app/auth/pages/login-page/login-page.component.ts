import { Component, inject, signal } from '@angular/core';
import { ResponsiveService } from '../../../material/services/responsive.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ILoginPayload } from 'global-interfaces';
import { AlertsService } from '../../../shared/services/alerts.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrl: '../../auth.styles.css'
})
export class LoginPageComponent {
  public layout = inject(ResponsiveService);
  public hide = signal(true);
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _alertService = inject(AlertsService);
  private _router = inject(Router);

  public loginForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  public clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public onSubmit() {
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload = this.loginForm.value as ILoginPayload;

    this._authService.login(payload).subscribe({
      next: () => this._router.navigateByUrl('/my-forms'),
      error: (err) => this._alertService.errorApi(err)
    });
  }

  public getFormErrors(field: keyof ILoginPayload) {
    return this.loginForm.get(field)?.errors
  }

}
