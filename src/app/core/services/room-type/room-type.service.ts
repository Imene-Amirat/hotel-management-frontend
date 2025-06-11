import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

  private readonly API_URL = 'http://localhost:8080/api/room-types'; 

  constructor(private http: HttpClient) { }

  getAllRoomTypes(): Observable<any> {
    return this.http.get(`${this.API_URL}`, { withCredentials: true });
  }
}
