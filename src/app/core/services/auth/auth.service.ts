import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//makes the service usable anywhere
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:8080/api/auth'; //backend auth endpoint
  public loggedIn: boolean = false; 

  //injects the HttpClient service to make requests to the backend
  constructor(private http: HttpClient) { }

  //sends a POST request to the backend with the login data
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, {email, password}, {withCredentials: true});
  }

  isAuthenticated(): Observable<any> {
    return this.http.get(`${this.API_URL}/isAuthenticated`, {withCredentials: true});
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.API_URL}/me`, {withCredentials: true});
  }

  logout(): Observable<any>  {  
    return this.http.post(`${this.API_URL}/logout`, {}, {withCredentials: true});
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, {username, email, password}, {withCredentials: true})
  };

}
