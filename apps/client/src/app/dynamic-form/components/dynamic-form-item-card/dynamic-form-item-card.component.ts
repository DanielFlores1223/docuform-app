import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dynamic-form-item-card',
  templateUrl: './dynamic-form-item-card.component.html',
  styleUrl: './dynamic-form-item-card.component.css'
})
export class DynamicFormItemCardComponent {
  @Input()
  public title: string = '';
  @Input()
  public description: string = '';
  @Input()
  public slug: string = '';

  private router = inject(Router);

  public redirectTo() {
    //TODO: Add route to navigate to form dashboard 
    //this.router.navigate([''])
    console.log('Navigate to...')
  }

}
