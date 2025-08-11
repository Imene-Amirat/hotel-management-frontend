import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected readonly API_URL = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/`, { withCredentials: true });
  }
}
