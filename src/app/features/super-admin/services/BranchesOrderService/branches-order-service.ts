import { constructorChecks } from '@angular/cdk/schematics';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BranchesOrderResponse } from '../../models/Branches-Order-Response';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../core/models/auth.model';
import { BranchResponse } from '../../models/Branch-Response';
import { PageResponse } from '../../models/PageResponse';

@Injectable({
  providedIn: 'root',
})
export class BranchesOrderService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

getAllOrdersBranches(
  branchId?: number,
  search?: string,
   date?: string, 
  page: number = 0,
  size: number = 10
): Observable<ApiResponse<PageResponse<BranchesOrderResponse>>> {
  let params: any = {
    page: page.toString(),
    size: size.toString()
  };
  if (branchId && branchId !== 0) params.branchId = branchId;
  if (search && search.trim() !== '') params.search = search;
  if (date && date.trim() !== '') params.date = date;
  return this.http.get<ApiResponse<PageResponse<BranchesOrderResponse>>>(
    `${this.apiUrl}/api/branch/allOrdersBranches`,
    { params }
  );
}


  getAllBranches():Observable<ApiResponse<BranchResponse[]>>{
    return this.http.get<ApiResponse<BranchResponse[]>>(`${this.apiUrl}/api/branch`)
  }
}
