import { Component } from '@angular/core';
import { RoomTypeService } from '../../core/services/room-type/room-type.service';
import { RoomType } from '../../shared/models/roomType';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  rooms: RoomType[] = [];
  apiUrl = 'http://localhost:8080/';

  constructor(private roomService: RoomTypeService, private router: Router) { }

  ngOnInit() {
    this.roomService.getAllRooms().subscribe({
      next: (res) => {
        console.log(res);
        this.rooms = res;
      },
      error: (error) => {
        console.error('Error fetching rooms:', error);
      }

    });
  }

  goToDetailsRoom(id: number) {
    this.router.navigate(['/rooms', id]);
  }

}
