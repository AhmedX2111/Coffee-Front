import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/response.model';
import { Addon } from '../../features/customer/models';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddonService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = environment.apiBaseUrl + '/api/addon';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getAllAddons(): Observable<Addon[]> {
    return this.http
      .get<any>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(
        map(response => {
          // Handle both ApiResponse<Addon[]> and direct array responses
          if (Array.isArray(response)) {
            return response;
          }
          return response.data || response;
        }),
        catchError(error => {
          console.error('Error loading add-ons:', error);
          return of([]);
        })
      );
  }
}
