import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailForm } from './payment-detail-form';

describe('PaymentDetailForm', () => {
  let component: PaymentDetailForm;
  let fixture: ComponentFixture<PaymentDetailForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDetailForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDetailForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
