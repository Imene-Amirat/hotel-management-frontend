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

  getRoomTypeById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`, {withCredentials: true});
  }

  getRoomGallery(id: number): Observable<RoomGallery[]> {
    return this.http.get<RoomGallery[]>(`${this.API_URL}/${id}/gallery`, {withCredentials: true});
  }

  checkRoomAvailability(params: { roomTypeId: number, checkIn: string, checkOut: string }): Observable<any> {
    return this.http.get(`${this.API_URL}/availability/check`, {params, withCredentials: true});
  }

  getFirstAvailableRoom(params: { roomTypeId: number, checkIn: string, checkOut: string }): Observable<any> {
    return this.http.get(`${this.API_URL}/availability/first`, {params, withCredentials: true});
  }

  searchRooms(params: { roomTypeId?: number, checkIn?: string, checkOut?: string, price?: number }): Observable<any> {
    return this.http.get(`${this.API_URL}/search`, {params, withCredentials: true});
  }
}
