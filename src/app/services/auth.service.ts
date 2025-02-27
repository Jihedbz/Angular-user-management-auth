import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9090/project_war_exploded/api/auth'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  register(username: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password, role });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }, { responseType: 'text' });
  }

  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

}
