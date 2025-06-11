import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormItemCardComponent } from './dynamic-form-item-card.component';

describe('DynamicFormItemCardComponent', () => {
  let component: DynamicFormItemCardComponent;
  let fixture: ComponentFixture<DynamicFormItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFormItemCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
