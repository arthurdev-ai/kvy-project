import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private emailUser = '';
  private apiUrl = 'http://localhost:8081/api/auth/';
  constructor(private http: HttpClient) {}

  setEmailUser(str: string) {
    this.emailUser = str;
  }

  getEmailUser(): string {
    return this.emailUser;
  }

  logUser(username: string, password: string) {
    return this.http.post<any>(this.apiUrl + 'signin', {
      username,
      password,
    });
  }
  registerUser(username: string, email: string, password: string) {
    return this.http.post<any>(this.apiUrl + 'signup', {
      username,
      email,
      password,
    });
  }
}
