import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../core/services/room/room.service';
import { Room } from '../../shared/models/room';
import { CommonModule } from '@angular/common';
import { RoomGallery } from '../../shared/models/roomGallery';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';

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
  room: Room | null = null;
  roomGallery: RoomGallery[] = [];
  id = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private confirmService: ConfirmDialogService
  ) { }

  ngOnInit() {
    this.roomService.getRoomById(this.id).subscribe({
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

  bookingForm = this.fb.group({
    checkIn: ['', Validators.required],
    checkOut: ['', Validators.required]
  });

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
          this.confirmService.ask('Are you sure you want to delete this room?').subscribe(result => {
            if (result) {
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
