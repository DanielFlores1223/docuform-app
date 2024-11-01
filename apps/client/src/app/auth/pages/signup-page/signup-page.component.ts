import { Component, inject, signal } from '@angular/core';
import { ResponsiveService } from '../../../material/services/responsive.service';

@Component({
  templateUrl: './signup-page.component.html',
  styleUrls: ['../../auth.styles.css', './signup-page.component.css']
})
export class SignupPageComponent {
  public hide = signal(true);
  public layout = inject(ResponsiveService);

  public clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
