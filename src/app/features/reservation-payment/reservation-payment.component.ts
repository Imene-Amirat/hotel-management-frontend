import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLabel } from '@angular/material/form-field';
import { ReservationService } from '../../core/services/reservation/reservation.service';

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

  constructor (
    private reservationService: ReservationService,
  ){}

  ngOnInit() {
    this.reservationService.getReservation().subscribe({
      next: (res) => {
        console.log('Reservation data:', res);
      },
      error: (error) => {
        console.error('Error fetching reservation:', error);
      }
    });
  }
}
