import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomGallery } from '../../../shared/models/roomGallery';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private readonly API_URL = 'http://localhost:8080/api/rooms'; 

  constructor(private http: HttpClient) { }

  getAllRooms(): Observable<any> {
    return this.http.get(`${this.API_URL}/`, {withCredentials: true});
  }

  getRoomById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`, {withCredentials: true});
  }

  getRoomGallery(id: number): Observable<RoomGallery[]> {
    return this.http.get<RoomGallery[]>(`${this.API_URL}/${id}/gallery`, {withCredentials: true});
  }

  checkRoomAvailability(payload: { roomTypeId: number, checkIn: string, checkOut: string }): Observable<any> {
    return this.http.post('http://localhost:8080/api/reservations/check-availability', payload, {withCredentials: true});
  }

}
