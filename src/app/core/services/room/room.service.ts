import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private readonly API_URL = 'http://localhost:8080/api/rooms'; 

  constructor(private http: HttpClient) { }

  getAllRooms(): Observable<any> {
    return this.http.get(`${this.API_URL}/all`, {withCredentials: true});
  }
}
