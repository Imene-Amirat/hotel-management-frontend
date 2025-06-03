import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly API_URL = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) { }

  createReservation(reservationData: {}): Observable<any>{
    return this.http.post(`${this.API_URL}/`, reservationData, { withCredentials: true });
  }

  getReservationById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`, { withCredentials: true });
  }

  getAllReservationsByUser(): Observable<any> {
    return this.http.get(`${this.API_URL}/user`, { withCredentials: true });
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, { withCredentials: true });
  }
}
