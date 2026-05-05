import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/response.model';
import { DashboardOverviewResponse } from '../models/dashboard.model';
import { environment } from '../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/admin/dashboard`;

  getDashboardOverview(): Observable<ApiResponse<DashboardOverviewResponse>> {
    return this.http.get<ApiResponse<DashboardOverviewResponse>>(
      `${this.apiUrl}/overview`
    );
  }
}
