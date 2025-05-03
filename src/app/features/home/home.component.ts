import { Component } from '@angular/core';
import { RoomService } from '../../core/services/room/room.service';
import { Room } from '../../shared/models/room';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  apiUrl = 'http://localhost:8080';
  rooms: Room[] = [];
  
  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.getAllRooms().subscribe({
      next: (res) => {
        console.log('Rooms:', res);
        this.rooms = res;
      },
      error: (err) => {
        console.error('Error fetching rooms:', err);
      }
    })
  }
}
