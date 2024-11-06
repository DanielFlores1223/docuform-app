import { Component, inject, signal } from '@angular/core';
import { ResponsiveService } from '../../../material/services/responsive.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegisterUserPayload } from 'global-interfaces';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  templateUrl: './signup-page.component.html',
  styleUrls: ['../../auth.styles.css', './signup-page.component.css']
})
export class SignupPageComponent {
  public hide = signal(true);
  public layout = inject(ResponsiveService);
  public fb = inject(FormBuilder);
  public authService = inject(AuthService);
  public router = inject (Router);

  public signUpForm: FormGroup = this.fb.group({
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

    this.authService.signup(payload).subscribe({
      next: () => this.router.navigateByUrl('/my-forms'),
      error: (err) => {
        // TODO: implement some solution
        console.log(err);
      }
    });

  }
}
