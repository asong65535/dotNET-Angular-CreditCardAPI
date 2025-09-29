import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PaymentDetails} from './payment-details/payment-details';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HttpClientModule,
    PaymentDetails,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('PaymentApp');
}
