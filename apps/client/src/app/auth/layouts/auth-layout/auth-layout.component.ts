import { Component, inject } from '@angular/core';
import { ResponsiveService } from '../../../material/services/responsive.service';

@Component({
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {
  public layout = inject(ResponsiveService);
}
