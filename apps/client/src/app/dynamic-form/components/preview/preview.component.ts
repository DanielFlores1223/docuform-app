import { Component, Input, inject } from '@angular/core';
import { ResponsiveService } from '../../../material/services/responsive.service';
import { FormFieldsPayload } from 'global-interfaces';

@Component({
  selector: 'dynamic-form-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent {
  public layout = inject(ResponsiveService);
  @Input()
  public formFieldsArray: FormFieldsPayload[] = [];
}
