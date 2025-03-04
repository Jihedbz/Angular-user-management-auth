import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Import tap from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService(); // Create an instance of JwtHelperService

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
    this.setRoleFromToken(token);  // Set role after saving the token
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('jwtToken'); // Returns true if the token exists
  }

  logout(): Observable<any> {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
    this.authStatus.next(false); // Notify that user is logged out
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  private setRoleFromToken(token: string) {
    try {
      const decodedToken = this.jwtHelper.decodeToken(token); // Decode the token
      localStorage.setItem('role', decodedToken.role); // Save role to local storage
    } catch (e) {
      console.error("Error decoding token", e);
    }
  }
}
