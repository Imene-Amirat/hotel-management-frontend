import { Component } from '@angular/core';
import { RoomType } from '../../shared/models/roomType';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RoomService } from '../../core/services/room/room.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  rooms: RoomType[] = [];
  filteredRooms: RoomType[] = [];
  apiUrl = 'http://localhost:8080/';
  checkIn: string | null = null;
  checkOut: string | null = null

  constructor(
    private roomService: RoomService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const rooms$ = this.roomService.getAllRooms();
    const params$ = this.route.queryParamMap;

    //this combines both observables and emits a value only when both emit
    combineLatest([rooms$, params$]).subscribe({
      next:([rooms, params]) => {
        this.rooms = rooms;

        this.checkIn = params.get('checkIn');
        this.checkOut = params.get('checkOut');
        const roomTypeId = params.get('roomTypeId');
        const price = params.get('price');

        if (roomTypeId && price) {
          this.filteredRooms = this.rooms.filter(room =>
            room.id == Number(roomTypeId) &&
            room.pricePerNight <= Number(price)
          );
        } else {
          this.filteredRooms = [...this.rooms]; //this copies all elements from the this.rooms array into a new array and assigns it to this.filteredRooms.
        }

        console.log('Filtered Rooms:', this.filteredRooms);
      },
      error: (error) => {
        console.error('Error fetching rooms or query params:', error);
      }
    });
  }

  goToDetailsRoom(id: number) {
    const queryParams: any = {};

    if(this.checkIn && this.checkOut) {
      queryParams.checkIn = this.checkIn;
      queryParams.checkOut = this.checkOut;
    }
    this.router.navigate(['/rooms', id], { queryParams });
  }

}
