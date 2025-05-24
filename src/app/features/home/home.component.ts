import { Component } from '@angular/core';
import { RoomTypeService } from '../../core/services/room/room.service';
import { RoomType } from '../../shared/models/roomType';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  apiUrl = 'http://localhost:8080';
  rooms: RoomType[] = [];
  
  constructor(private roomService: RoomTypeService, private router: Router) { }

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

  goToDetailsRoom(id: number) {
    this.router.navigate(['/rooms', id]);
  }
}
