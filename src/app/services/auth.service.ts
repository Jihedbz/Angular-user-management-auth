import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9090/project_war_exploded/api/auth'; // Update with your backend URL

  private authStatus = new BehaviorSubject<boolean>(this.hasToken()); // Track login status
  authStatus$ = this.authStatus.asObservable(); // Expose observable for components


  constructor(private http: HttpClient) {}

  register(username: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password, role });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }, { responseType: 'text' }).pipe(
      tap((token: string) => {
        this.saveToken(token);
        this.authStatus.next(true); // Notify that user is logged in
        console.log('JWT Token:', token);
      })
    );
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken'); // Returns true if token exists
  }

  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('jwtToken'); // Returns true if the token exists
  }


  logout(): Observable<any> {
    localStorage.removeItem('jwtToken');
    this.authStatus.next(false); // Notify that user is logged out
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

}
