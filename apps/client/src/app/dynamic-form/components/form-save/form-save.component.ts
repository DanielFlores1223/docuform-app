import { Component, computed, inject, input } from '@angular/core';
import { ResponsiveService } from '../../../material/services/responsive.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateDynamicFormPayload } from 'global-interfaces';

@Component({
  selector: 'dynamic-form-save',
  templateUrl: './form-save.component.html',
  styleUrl: './form-save.component.css',
})
export class FormSaveComponent {
  public layout = inject(ResponsiveService);
  public innerHeight = input<number | null>(null);
  private _fb = inject(FormBuilder);

  public dynamicForm: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)] ],
    description: ['', [Validators.required, Validators.maxLength(255)]],
    field: this._fb.group({
      idFieldType: [1, [Validators.min(1)]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      scannedDocumentSeparator: ['', [Validators.required, Validators.maxLength(255)]]
    }),
    fields: this._fb.array([])
  });

  get fields(): FormArray {
    return this.dynamicForm.get('fields') as FormArray;
  }

  addField(): void {
    const field = this._fb.group({
      idFieldType: 0,
      name: '',
      scannedDocumentSeparator: ''
    });

    this.fields.push(field);
  }

  removeField(index: number) {
    this.fields.removeAt(index);
  }

  public getFormErrors(field: string) {
    return this.dynamicForm.get(field)?.errors
  }

  public getFormErrorsField(field: string) {
    return this.dynamicForm.get('field')?.get(field)?.errors;
  }

  public onAddField() {
    const fieldForm = this.dynamicForm.controls['field'];

    if(fieldForm.invalid) {
      fieldForm.markAllAsTouched();
      return;
    }



  }

}
