import { Component, inject, signal } from '@angular/core';
import { ResponsiveService } from '../../../material/services/responsive.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  public layout = inject(ResponsiveService);
  public hide = signal(true);

  public clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
