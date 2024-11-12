import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'dynamic-form-fields-cards',
  templateUrl: './fields-cards.component.html',
  styleUrl: './fields-cards.component.css',
})
export class FieldsCardsComponent {
  public innerHeight = input<number | null>(null);
  public maxHeighFieldsDiv = computed((): string => {
    if (!this.innerHeight()) return 'max-height: 100vh';

    const px = this.innerHeight()! * 0.3;

    return `max-height: ${px}px`;
  });
}
