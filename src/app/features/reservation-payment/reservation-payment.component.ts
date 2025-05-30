import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLabel } from '@angular/material/form-field';
import { EnglishDatePipe } from '../../shared/pipes/english-date.pipe';
import { ReservationService } from '../../core/services/reservation/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { ReservationSummary } from '../../shared/models/ReservationSummary';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentService } from '../../core/services/payment/payment.service';

@Component({
  selector: 'app-reservation-payment',
  standalone: true,
  imports: [
    MatLabel,
    CommonModule,
    EnglishDatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './reservation-payment.component.html',
  styleUrl: './reservation-payment.component.scss'
})
export class ReservationPaymentComponent {
  id = Number(this.route.snapshot.paramMap.get('id'));
  resSummary: ReservationSummary | null = null;
  paymentSuccess = false;
 
  constructor (
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private paymentService: PaymentService
  ){}

  ngOnInit() {
    this.reservationService.getReservationById(this.id).subscribe({
      next: (res) => {
        this.resSummary = res;
        console.log('Reservation data:', res);
      },
      error: (err) => console.error('Failed to fetch reservation:', err)
      
    });

    //This block listens for changes on the "method" radio button
    //If CREDIT_CARD is selected → we add validators to cardNumber, cardExpiry, cardCvc.
    //If PAY_AT_ARRIVAL is selected → those fields are ignored.
    this.paymentForm.get('method')?.valueChanges.subscribe((method) => {
      const cardFields = ['cardNumber', 'cardExpiry', 'cardCvc'];

      cardFields.forEach((field) => {
        const control = this.paymentForm.get(field);

        if (method === 'CREDIT_CARD') {
          control?.setValidators([Validators.required]);
        } else {
          control?.clearValidators();
        }

        control?.updateValueAndValidity();
      });
    });
  }

  paymentForm = this.fb.group({
    method: ['CREDIT_CARD', Validators.required],
    cardNumber: [''],
    cardExpiry: [''],
    cardCvc: ['']
  });

  confirmAndPay() {
    if (this.paymentForm.invalid) {
      console.log('Invalid form');
      this.paymentForm.markAllAsTouched();
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
      });

      return;
    }

    const data = {
      method: this.paymentForm.get('method')?.value as string,
      reservationId: this.id,
      amount: this.resSummary?.totalPrice || 0,
      created_at: new Date(),
    };

    this.paymentService.confirmPayment(data).subscribe({
      next: (res) => {
        console.log('Payment confirmed:', res);
        this.snackBar.open('Payment successful!', 'Close', {
          duration: 3000,
        });
        this.paymentSuccess = true;
      },
      error: (error) => {
        console.error('Error confirming payment:', error);
        this.snackBar.open('Payment failed. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    });
  }

}
