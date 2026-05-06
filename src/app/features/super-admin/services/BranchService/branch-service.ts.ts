import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../customer/models';
import { Observable } from 'rxjs';
import { AdminBranchRequest ,AdminBranchResponse} from '../../models/branch';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient){}

  addBranch(Branch:AdminBranchRequest):Observable<ApiResponse<AdminBranchResponse>>{
    return this.http.post<ApiResponse<AdminBranchResponse>>(`${this.apiUrl}/api/branch`,Branch);
  }
// get all branches
  getAllBranches():Observable<ApiResponse<AdminBranchResponse[]>>{
    return this.http.get<ApiResponse<AdminBranchResponse[]>>(`${this.apiUrl}/api/branch`)
  }
// get one branch by id
  getOneBranch(id : String):Observable<ApiResponse<AdminBranchResponse>>{
    return this.http.get<ApiResponse<AdminBranchResponse>>(`${this.apiUrl}/api/branch/${id}`)
  }

// delete branch
  deleteBranch(id: String):Observable<ApiResponse<void>>{
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/api/branch/${id}`)
  }

// update branch
 updateBranch(id: String, request: AdminBranchRequest): Observable<ApiResponse<AdminBranchResponse>> {
  return this.http.put<ApiResponse<AdminBranchResponse>>(
    `${this.apiUrl}/api/branch/${id}`,
    request
  );
} 

} 
