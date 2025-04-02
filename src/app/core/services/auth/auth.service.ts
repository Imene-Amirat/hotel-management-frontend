import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//makes the service usable anywhere
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:8080/api/auth'; //backend auth endpoint

  //injects the HttpClient service to make requests to the backend
  constructor(private http: HttpClient) { }

  //sends a POST request to the backend with the login data
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {  
    localStorage.removeItem('token');
  }
}
