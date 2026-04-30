import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Branch, ApiResponse } from '../models';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BranchService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/api/branches`;

  getAll(): Observable<Branch[]> {
    return this.http.get<ApiResponse<Branch[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }
}
