import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../core/models/auth.model';
import { environment } from '../../../../../environments/environment';
import { AddonResponse } from '../../models/addon-response';
import { AddonRequest } from '../../models/addon-request';

@Injectable({
  providedIn: 'root',
})
export class AddonService {
    private apiUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient){}

  addAddon(addAddonRequest:AddonRequest):Observable<ApiResponse<AddonRequest>>{
    return this.http.post<ApiResponse<AddonRequest>>(`${this.apiUrl}/api/addon`,addAddonRequest);
  }

  getAllAddons(search?: string):Observable<ApiResponse<AddonResponse[]>>{
    return this.http.get<ApiResponse<AddonResponse[]>>(`${this.apiUrl}/api/addon?search=${search || ''}`)
  }

  deleteAddon(id:number):Observable<ApiResponse<void>>{
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/api/addon/${id}`)
  }

updateAddon(id: number, request: AddonRequest): Observable<ApiResponse<AddonResponse>> {
  return this.http.put<ApiResponse<AddonResponse>>(
    `${this.apiUrl}/api/addon/${id}`,
    request
  );
}
}
