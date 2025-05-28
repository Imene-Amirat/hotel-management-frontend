import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-reservation-payment',
  standalone: true,
  imports: [
    MatLabel,
    CommonModule,
  ],
  templateUrl: './reservation-payment.component.html',
  styleUrl: './reservation-payment.component.scss'
})
export class ReservationPaymentComponent {

}
