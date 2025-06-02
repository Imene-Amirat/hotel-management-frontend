import { Component } from '@angular/core';
import { ReservationService } from '../../core/services/reservation/reservation.service';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../shared/models/reservation';
import { EnglishDatePipe } from '../../shared/pipes/english-date.pipe';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [
    CommonModule,
    EnglishDatePipe
  ],
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.scss'
})

export class MyReservationsComponent {
  reservations: Reservation[] = [];
  errorMessage: string = '';

  constructor(
    private reservationsService: ReservationService,
  ) {}

  ngOnInit() {
    this.reservationsService.getAllReservationsByUser().subscribe({
      next: (res) => {
        this.reservations = res;
        console.log('My Reservations:', res);
      },
      error: (err) => {
        console.error('Error fetching reservations:', err);
        this.errorMessage = err?.error?.message || 'An unexpected error occurred.';

      }
    });
  }
}
