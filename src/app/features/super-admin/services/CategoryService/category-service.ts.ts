import { Category } from './../../../../core/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../customer/models';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AdminCategoryRequest, AdminCategoryResponse } from '../../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient){}

  addCategory(Category:FormData):Observable<ApiResponse<AdminCategoryResponse>>{
    return this.http.post<ApiResponse<AdminCategoryResponse>>(`${this.apiUrl}/api/category`,Category);
  }

  
// get all categories
  getAllCategories():Observable<ApiResponse<AdminCategoryResponse[]>>{
    return this.http.get<ApiResponse<AdminCategoryResponse[]>>(`${this.apiUrl}/api/category`)
  }
// get one category by id
  getOneCategory(id : String):Observable<ApiResponse<AdminCategoryResponse>>{
    return this.http.get<ApiResponse<AdminCategoryResponse>>(`${this.apiUrl}/api/category/${id}`)
  }

// delete category
  deleteCategory(id: String):Observable<ApiResponse<void>>{
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/api/category/${id}`)
  }

// update category
 updateCategory(id: String, request: FormData): Observable<ApiResponse<AdminCategoryResponse>> {
  return this.http.put<ApiResponse<AdminCategoryResponse>>(
    `${this.apiUrl}/api/category/${id}`,
    request
  );
} 

} 
