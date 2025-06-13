import { Component } from '@angular/core';
import { RoomType } from '../../shared/models/roomType';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RoomService } from '../../core/services/room/room.service';
import { RoomTypeService } from '../../core/services/room-type/room-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  apiUrl = 'http://localhost:8080';
  rooms: RoomType[] = [];
  roomTypes: RoomType[] = [];
  todayString = new Date().toISOString().split('T')[0];
  price = 0;
  filteredRooms : RoomType[] = [];
  
  constructor(
    private roomService: RoomService,
    private router: Router,
    private fb: FormBuilder,
    private roomTypeService: RoomTypeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.roomService.getAllRooms().subscribe({
      next: (res) => {
        console.log('Rooms:', res);
        this.rooms = res;
      },
      error: (err) => {
        console.error('Error fetching rooms:', err);
      }
    });

    this.roomTypeService.getAllRoomTypes().subscribe({
      next: (res) => {
        console.log('Room Types:', res);
        this.roomTypes = res;
      },
      error: (err) => {
        console.error('Error fetching room types:', err);
      }
    });
  } 

  onPriceInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.price = +input.value;
    console.log('Slider value:', this.price);
  }

  searchForm = this.fb.group({
    checkIn: ['', Validators.required],
    checkOut: ['', Validators.required],
    roomType: ['', Validators.required],
    price: [100, [Validators.required, Validators.min(100)]]
  }, {
    validators: [dateRangeValidator(), noPastDateValidator()]
  });

  search() {
    if (this.searchForm.invalid) {
      console.log('Invalid form');
      this.searchForm.markAllAsTouched(); 
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
      });
      return;
    }

    this.filteredRooms = this.rooms.filter(room =>
      room.id == Number(this.searchForm.value.roomType) &&
      room.pricePerNight <= this.price
    );
    console.log('Filtered Rooms:', this.filteredRooms);
    
    if( this.filteredRooms.length === 0) {
      this.snackBar.open('No rooms found matching your criteria.', 'Close', {
        duration: 3000,
      });
      this.searchForm.reset();
    }
    else {
      const formData = this.searchForm.value;

      this.router.navigate(['/rooms'], {
        queryParams: {
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          roomTypeId: formData.roomType,
          price: this.price
        }});
    }
  }

  goToDetailsRoom(id: number) {
    this.router.navigate(['/rooms', id]);
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
