import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, RegisterRequest, UserResponse } from '../models/auth.model';
import { ApiResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiBaseUrl;
  private tokenKey = 'auth_token';
  private userKey = 'user_data';

  login(credentials: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/api/login`, credentials, {
      withCredentials: true,
    });
  }

  register(userData: RegisterRequest): Observable<ApiResponse<UserResponse>> {
    return this.http.post<ApiResponse<UserResponse>>(`${this.apiUrl}/api/register`, userData, {
      withCredentials: true,
    });
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  saveUser(user: UserResponse): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): UserResponse | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const decode = this.decodeToken(token);
    return decode?.role || null;
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  isSuperAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  isBranchManager(): boolean {
    return this.getUserRole() === 'BRANCH_MANAGER';
  }

  isCustomer(): boolean {
    return this.getUserRole() === 'CUSTOMER';
  }
}
