import { Component, computed, inject, input } from '@angular/core';
import { ResponsiveService } from '../../../material/services/responsive.service';

@Component({
  selector: 'dynamic-form-save',
  templateUrl: './form-save.component.html',
  styleUrl: './form-save.component.css',
})
export class FormSaveComponent {
  public layout = inject(ResponsiveService);
  public innerHeight = input<number | null>(null);
}
