import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffResponse } from '../../models/staff-response';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../core/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient){}

  getAllStaff(search?:string):Observable<ApiResponse<StaffResponse[]>>{
    return this.http.get<ApiResponse<StaffResponse[]>>(`${this.apiUrl}/api/staff?search=${search || ''}`)
  }
}
