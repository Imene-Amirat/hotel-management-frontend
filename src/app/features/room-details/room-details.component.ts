import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomTypeService } from '../../core/services/room-type/room-type.service';
import { RoomType } from '../../shared/models/roomType';
import { CommonModule } from '@angular/common';
import { RoomGallery } from '../../shared/models/roomGallery';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogService } from '../../core/services/confirm-dialog/confirm-dialog.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss'
})
export class RoomDetailsComponent {
  apiUrl = 'http://localhost:8080';
  room: RoomType | null = null;
  roomGallery: RoomGallery[] = [];
  id = Number(this.route.snapshot.paramMap.get('id'));
  todayString = new Date().toISOString().split('T')[0];

  constructor(
    private roomService: RoomTypeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private confirmService: ConfirmDialogService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.roomService.getRoomTypeById(this.id).subscribe({
      next: (res) => {
        console.log('Room Details:', res);
        this.room = res; 
      },
      error: (err) => {
        console.error('Error fetching room details:', err);
        this.room = null;
      }
    });

    this.roomService.getRoomGallery(this.id).subscribe({
      next: (res: RoomGallery[]) => {
        console.log('Room Gallery:', res);
        this.roomGallery = res;
      },
      error: (err) => {
        console.error('Error fetching room gallery:', err);
      }
    });
  }

  bookingForm = this.fb.group(
    {checkIn: ['', Validators.required],
     checkOut: ['', Validators.required]},
    { validators: [dateRangeValidator(), noPastDateValidator()]}
  );

  checkRoomAvailability() {
    if (this.bookingForm.invalid) {
      console.log('Invalid form');
      this.bookingForm.markAllAsTouched(); 
      return;
    }

    const checkInControl = this.bookingForm.get('checkIn');
    const checkOutControl = this.bookingForm.get('checkOut');

    const checkIn = checkInControl?.value as string; 
    const checkOut = checkOutControl?.value as string;

    const payload = {
      roomTypeId: this.id,
      checkIn,
      checkOut
    };
  
    this.roomService.checkRoomAvailability(payload).subscribe({
      next: (res) => {
        console.log('Room availability:', res);
        if (res.available) {
          this.confirmService.ask('Are you sure you want to reserve this room ?').subscribe(result => {
            if (result) {
              this.authService.isAuthenticated().subscribe({
                next : (res) => {
                  if (res.loggedIn) {
                    this.router.navigate(['/reservation/confirm'], {queryParams: payload});
                  }
                  else {
                    this.snackBar.open('Please login to reserve a room.', 'Close', {
                      duration: 3000,
                      panelClass: ['snackbar-error']
                    });
                  }
                }
              });
            }
          });
        } else {
          alert('Room is not available for the selected dates.');
        }
      },
      error: (err) => {
        console.error('Error checking room availability:', err);
      }
    });
  }
}

export function dateRangeValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const checkIn = formGroup.get('checkIn')?.value;
    const checkOut = formGroup.get('checkOut')?.value;

    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
      return { dateRangeInvalid: true };
    }

    return null;
  };
}

export function noPastDateValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const checkIn = new Date(group.get('checkIn')?.value);
    const checkOut = new Date(group.get('checkOut')?.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignore time part

    if ((checkIn && checkIn < today) || (checkOut && checkOut < today)) {
      return { pastDate: true };
    }
    return null;
  };
}


