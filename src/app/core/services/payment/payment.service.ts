import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly API_URL = 'http://localhost:8080/api/payment';
  
  constructor(private http: HttpClient) { }

  confirmPayment(data: {reservationId: number, method: string, amount: number, created_at: Date}): Observable<any>{
    return this.http.post(`${this.API_URL}/`, {data, withCredentials: true });
  }
  
}
