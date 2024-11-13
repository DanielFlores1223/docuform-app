import { Component, ElementRef, EventEmitter, Output, ViewChild, inject, input } from '@angular/core';
import { ResponsiveService } from '../../../material/services/responsive.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFieldsPayload, ICreateDynamicFormPayload } from 'global-interfaces';
import { AlertsService } from '../../../shared/services/alerts.service';
import { DynamicFormService } from '../../services/dynamic-form.service';

@Component({
  selector: 'dynamic-form-save',
  templateUrl: './form-save.component.html',
  styleUrl: './form-save.component.css',
})
export class FormSaveComponent {
  @ViewChild('inputFieldName')
  public inputFieldName?: ElementRef<HTMLInputElement>;
  @Output()
  public onFormFieldsPayload: EventEmitter<FormFieldsPayload[]> = new EventEmitter();
  public layout = inject(ResponsiveService);
  public innerHeight = input<number | null>(null);
  private readonly _fb = inject(FormBuilder);
  private readonly _alertService = inject(AlertsService);
  private readonly _dynamicFormService = inject(DynamicFormService);

  public dynamicForm: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)] ],
    description: ['', [Validators.required, Validators.maxLength(255)]],
    fields: this._fb.array([]),
  });

  public fieldForm = this._fb.group({
    idFieldType: [1, [Validators.min(1)]],
    name: ['', [Validators.required, Validators.maxLength(50)]],
    scannedDocumentSeparator: ['', [Validators.required, Validators.maxLength(255)]]
  });

  get fields(): FormArray {
    return this.dynamicForm.get('fields') as FormArray;
  }

  get fieldsArray() {
    return this.fields.controls as FormControl[];
  }

  addField(fieldForm: FormFieldsPayload): void {
    const field = this._fb.group({
      idFieldType: fieldForm.idFieldType,
      name: fieldForm.name,
      scannedDocumentSeparator: fieldForm.scannedDocumentSeparator
    });

    this.fields.push(field);
  }

  removeField(index: number) {
    this.fields.removeAt(index);
  }

  public getFormErrors(field: keyof ICreateDynamicFormPayload) {
    return this.dynamicForm.get(field)?.errors
  }

  public getFormErrorsField(field: keyof FormFieldsPayload) {
    return this.fieldForm.get(field)?.errors;
  }

  public async onAddField() {
    if(this.fieldForm.invalid) {
      this.fieldForm.markAllAsTouched();
      return;
    }

    const fieldFormValue = this.fieldForm.value as FormFieldsPayload;
    this.addField(fieldFormValue);
    this.fieldForm.reset({
      idFieldType: 1
    });

    this.inputFieldName!.nativeElement.focus();
    this.emmitFormFieldsPayload();
    await this._alertService.toastAlert({
      icon: 'success',
      title: 'Field was added'
    });
  }

  public emmitFormFieldsPayload(): void {
    const payload = this.fields.value as FormFieldsPayload[];
    this.onFormFieldsPayload.emit([...payload]);
  }

  public onSubmit(): void {
    this.fieldForm.markAsUntouched();

    if(this.dynamicForm.invalid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }

    const payload = this.dynamicForm.value as ICreateDynamicFormPayload;

    this._dynamicFormService.create(payload).subscribe({
      next: (response) => {
        this._alertService.toastAlert({ icon: 'success', title: response.message });
        this.dynamicForm.reset();
        this.fields.clear();
        this.emmitFormFieldsPayload();
      },
      error: (err) =>
        this._alertService.errorApi(err)
    });
  }
}
