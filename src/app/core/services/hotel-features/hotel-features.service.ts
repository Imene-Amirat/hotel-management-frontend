import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature } from '../../../shared/models/feature';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelFeaturesService {

  private readonly API_URL = 'http://localhost:8080/api/features';

  constructor(private http: HttpClient) { }

  getAllFeatures(): Observable<any>{
    return this.http.get(`${this.API_URL}`, { withCredentials: true });
  }
}
