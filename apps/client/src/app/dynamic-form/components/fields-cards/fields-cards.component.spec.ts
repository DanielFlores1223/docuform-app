import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsCardsComponent } from './fields-cards.component';

describe('FieldsCardsComponent', () => {
  let component: FieldsCardsComponent;
  let fixture: ComponentFixture<FieldsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldsCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
