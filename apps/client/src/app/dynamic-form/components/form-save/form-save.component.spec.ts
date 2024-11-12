import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSaveComponent } from './form-save.component';

describe('FormSaveComponent', () => {
  let component: FormSaveComponent;
  let fixture: ComponentFixture<FormSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
