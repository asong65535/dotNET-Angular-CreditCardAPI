import { Component, OnInit } from '@angular/core';
import { PaymentDetailForm } from './payment-detail-form/payment-detail-form';
import { PaymentDetailService } from '../shared/payment-detail';
import { PaymentDetail } from 'app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  imports: [PaymentDetailForm],
  templateUrl: './payment-details.html',
  styleUrl: './payment-details.css',
})
export class PaymentDetails implements OnInit {
  constructor(public service: PaymentDetailService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: PaymentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete your card details?'))
      this.service.deletePaymentDetail(id).subscribe({
        next: (res) => {
          this.service.list = res as PaymentDetail[];
          this.toastr.error('Deleted Successfully', 'Success!');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
