import { Component, inject } from '@angular/core';
import { ResponsiveService } from '../../../material/services/responsive.service';
import { FormFieldsPayload } from 'global-interfaces';

@Component({
  selector: 'dynamic-form-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent {
  public layout = inject(ResponsiveService);

  public formFields: FormFieldsPayload[] = [
    {
      name: 'form1',
      idFieldType: 1,
      scannedDocumentSeparator: '1',
    },
    {
      name: 'form2',
      idFieldType: 2,
      scannedDocumentSeparator: '2',
    },
    {
      name: 'form3',
      idFieldType: 1,
      scannedDocumentSeparator: '3',
    },
  ];
}
