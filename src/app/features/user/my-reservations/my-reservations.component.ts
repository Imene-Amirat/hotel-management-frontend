import { Component } from '@angular/core';
import { ReservationService } from '../../../core/services/reservation/reservation.service';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../../shared/models/reservation';
import { EnglishDatePipe } from '../../../shared/pipes/english-date.pipe';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.reservationsService.getAllReservationsByUser().subscribe({
      next: (res) => {
        this.reservations = res;
        if(!this.reservations || this.reservations.length === 0) {
          this.errorMessage = 'No reservations found.';
        }
        console.log('My Reservations:', res);
      },
      error: (err) => {
        console.error('Error fetching reservations:', err);
        this.errorMessage = err?.error?.message || 'An unexpected error occurred.';

      }
    });
  }

  delete(id: number) {
    this.reservationsService.deleteReservation(id).subscribe({
      next: () => {
        this.reservations = this.reservations.filter(reservation => reservation.id !== id);
        console.log(`Reservation with ID ${id} deleted successfully.`);
      },
      error: (err) => {
        console.error('Error deleting reservation:', err);
        this.errorMessage = err?.error?.message || 'An unexpected error occurred while deleting the reservation.';
      }
    });
  }

  pay(reservationId: number) {
    this.router.navigate(['/reservation',reservationId,'payement']);
  }
}
