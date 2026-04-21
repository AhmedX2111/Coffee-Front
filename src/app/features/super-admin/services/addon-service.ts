import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddonRequest } from '../models/addon-request';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/auth.model';
import { environment } from '../../../../environments/environment';
import { AddonResponse } from '../models/addon-response';

@Injectable({
  providedIn: 'root',
})
export class AddonService {
    private apiUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient){}

  addAddon(addAddonRequest:AddonRequest):Observable<ApiResponse<AddonRequest>>{
    return this.http.post<ApiResponse<AddonRequest>>(`${this.apiUrl}/api/addon`,addAddonRequest);
  }

  getAllAddons():Observable<ApiResponse<AddonResponse[]>>{
    return this.http.get<ApiResponse<AddonResponse[]>>(`${this.apiUrl}/api/addon`)
  }

  deleteAddon(id:number):Observable<ApiResponse<void>>{
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/api/addon/${id}`)
  }

    getAddonById(id: number): Observable<ApiResponse<AddonResponse>> {
    return this.http.get<ApiResponse<AddonResponse>>(
      `${this.apiUrl}/api/addon/${id}`
    );
  }

  // ✅ UPDATE (جديدة)
  updateAddon(id: number, request: AddonRequest): Observable<ApiResponse<AddonResponse>> {
    return this.http.put<ApiResponse<AddonResponse>>(
      `${this.apiUrl}/api/addon/${id}`,
      request
    );
  }
}
