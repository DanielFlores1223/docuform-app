import { Component, inject } from '@angular/core';
import { ResponsiveService } from '../../../material/services/responsive.service';

@Component({
  templateUrl: './dynamic-form-layout.component.html',
  styleUrl: './dynamic-form-layout.component.css',
})
export class DynamicFormLayoutComponent {
  public layout = inject(ResponsiveService);
}
