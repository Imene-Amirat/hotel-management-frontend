import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EnglishDatePipe } from '../../shared/pipes/english-date.pipe'; 
import { RoomType } from '../../shared/models/roomType';
import { AuthService } from '../../core/services/auth/auth.service';
import { User } from '../../shared/models/user';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReservationService } from '../../core/services/reservation/reservation.service';
import { RoomService } from '../../core/services/room/room.service';

@Component({
  selector: 'app-reservation-confirm',
  standalone: true,
  imports: [
    CommonModule,
    EnglishDatePipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './reservation-confirm.component.html',
  styleUrl: './reservation-confirm.component.scss'
})
export class ReservationConfirmComponent {
  checkIn = this.route.snapshot.queryParamMap.get('checkIn') || '';
  checkOut = this.route.snapshot.queryParamMap.get('checkOut') || '';
  roomTypeId = Number(this.route.snapshot.queryParamMap.get('roomTypeId'));

  roomType: RoomType | null = null;
  nbNights: number = 0;
  totalPrice: number = 0;
  user: User | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private reservationService: ReservationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.roomService.getRoomTypeById(this.roomTypeId).subscribe({
      next: (res) => {
        this.roomType = res;
        console.log('Room type fetched successfully:', this.roomType);
        this.totalPrice = this.calculateTotalPrice();
      },
      error: (error) => {
        console.error('Error fetching room type:', error);
      }
    });

    this.nbNights = this.calculateNights();

    this.authService.isAuthenticated().subscribe({
      next: (res) => {
        if (res.loggedIn){
          this.authService.getCurrentUser().subscribe({
            next: (res) => {
              this.user = res;
              console.log('Current user:', res);
            },
            error: (error) => {
              console.error('Error fetching current user:', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error checking authentication status:', error);
      }
    });
  }

  reservationForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // assuming a 10-digit phone number
    city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
  });
  
  reserve(){
    if (this.reservationForm.invalid) {
      console.log('Invalid form');
      this.reservationForm.markAllAsTouched();
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
      });
      return;
    }

    const formValues = this.reservationForm.value;

    const reservationData = {
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      roomId: null,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      phone: formValues.phone,
      city: formValues.city,
      totalPrice: this.calculateTotalPrice(),
      status: 'PENDING',
    };

    const availabilityPayload = {
      roomTypeId: this.roomTypeId,
      checkIn: this.checkIn,
      checkOut: this.checkOut
    };
    
    this.checkAvailabilityAndReserve(availabilityPayload, reservationData);
  }

  private checkAvailabilityAndReserve(payload: any, baseData: any): void {
    this.roomService.checkRoomAvailability(payload).subscribe({
      next: (res) => {
        if(!res.available) {
          this.showSnack('Room is not available for the selected dates', 3000);
          return;
        }
        
        this.roomService.getFirstAvailableRoom(payload).subscribe({
          next: (res) => {
            baseData.roomId = Number(res.id);
            this.reservationService.createReservation(baseData).subscribe({
                next: (res) => {
                  this.showSnack('Reservation created successfully!', 3000);
                  const reservationId = res.reservationId;
                  this.router.navigate(['/reservation',reservationId,'payement']);
                },
                error: (error) => {
                  console.error('Error creating reservation:', error);
                  this.showSnack(`Error creating reservation. Please try again .`, 3000);
                }
              });
          },
          error: (error) => {
            this.showSnack(`Error fetching available room. Please try again.`, 3000);
          }
        });
        
      },
      error: (error) => {
        console.error('Error checking room availability:', error);
        this.showSnack(`Room is not available for the selected dates.`, 3000);
      }
    });
  }

  private showSnack(message: string, duration = 3000): void {
    this.snackBar.open(message, 'Close', { duration });
  }

  calculateTotalPrice(): number {
    if (this.roomType) {
      return this.roomType.pricePerNight * this.nbNights;
    }
    return 0;
  }

  calculateNights(): number {
    const checkInDate = new Date(this.checkIn);
    const checkOutDate = new Date(this.checkOut);
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  }
  
}
