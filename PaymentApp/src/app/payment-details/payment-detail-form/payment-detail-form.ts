import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PaymentDetailService } from 'app/shared/payment-detail';
import { PaymentDetail } from 'app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  imports: [FormsModule],
  templateUrl: './payment-detail-form.html',
  styleUrl: './payment-detail-form.css',
})
export class PaymentDetailForm {
  constructor(public service: PaymentDetailService, private toastr: ToastrService) {}

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true;
    if (form.valid) {
      if (this.service.formData.paymentDetailId == 0) {
        this.insertRecord(form);
      } else {
        this.updateRecord(form);
      }
    }
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe({
      next: (res) => {
        this.service.list = res as PaymentDetail[];
        this.service.resetForm(form);
        this.toastr.success('Inserted Successfully', 'Success!');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe({
      next: (res) => {
        this.service.list = res as PaymentDetail[];
        this.service.resetForm(form);
        this.toastr.info('Updated Successfully', 'Success!');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
