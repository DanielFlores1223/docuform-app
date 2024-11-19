import { Component, EventEmitter, Input, Output, computed, input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormFieldsPayload } from 'global-interfaces';

@Component({
  selector: 'dynamic-form-fields-cards',
  templateUrl: './fields-cards.component.html',
  styleUrl: './fields-cards.component.css',
})
export class FieldsCardsComponent {
  @Output()
  public indexDeleteField: EventEmitter<number> = new EventEmitter();
  @Output()
  public indexEditField: EventEmitter<number> = new EventEmitter();
  @Input()
  public fieldsArray: FormControl[] = [];
  public innerHeight = input<number | null>(null);
  public maxHeighFieldsDiv = computed((): string => {
    if (!this.innerHeight()) return 'max-height: 100vh';

    const px = this.innerHeight()! * 0.3;

    return `max-height: ${px}px`;
  });

  public formValue(name: keyof FormFieldsPayload, field: AbstractControl) {
    return field.value[name];
  }

  onClickDelete(index: number) {
    this.indexDeleteField.emit(index);
  }

  onClickUpdate(index: number) {
    this.indexEditField.emit(index);
  }

}
