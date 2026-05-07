import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../customer/models';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AdminProductRequest, AdminProductResponse } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient){}
//Product:AdminProductRequest
  addProduct(productFormData: FormData ):Observable<ApiResponse<AdminProductResponse>>{
    return this.http.post<ApiResponse<AdminProductResponse>>(`${this.apiUrl}/api/admin/product`,productFormData);
  }

  
 //get all products
  getAllProducts():Observable<ApiResponse<AdminProductResponse[]>>{
    return this.http.get<ApiResponse<AdminProductResponse[]>>(`${this.apiUrl}/api/admin/product`)
  }
 
// get one product by id
  getOneProduct(id : String):Observable<ApiResponse<AdminProductResponse>>{
    return this.http.get<ApiResponse<AdminProductResponse>>(`${this.apiUrl}/api/admin/product/${id}`)
  }
  
// delete product
  deleteProduct(id: String):Observable<ApiResponse<void>>{
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/api/admin/product/${id}`)
  }

// update product
 updateProduct(id: String, productFormData: FormData): Observable<ApiResponse<AdminProductResponse>> {
  return this.http.put<ApiResponse<AdminProductResponse>>(
    `${this.apiUrl}/api/admin/product/${id}`,
    productFormData
  );
} 
 
} 
