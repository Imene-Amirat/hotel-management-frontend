import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../core/services/room/room.service';
import { Room } from '../../shared/models/room';
import { CommonModule } from '@angular/common';
import { RoomGallery } from '../../shared/models/roomGallery';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss'
})
export class RoomDetailsComponent {
  apiUrl = 'http://localhost:8080';
  room: Room | null = null;
  roomGallery: RoomGallery[] = [];

  constructor(private roomService: RoomService, private route: ActivatedRoute) { }

  id = Number(this.route.snapshot.paramMap.get('id'));

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
}
