import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ProductResponse,
  CategoryResponse,
  ProductDetailResponse,
  ProductCustomizationRequest,
  PriceCalculationResponse,
} from '../models/product.model';
import { ApiResponse } from '../models/response.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductBrowsingService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = environment.apiBaseUrl;
  private endpoint = '/api/user/products';

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

  /**
   * Get featured products for landing page
   */
  getFeaturedProducts(): Observable<ApiResponse<ProductResponse[]>> {
    return this.http.get<ApiResponse<ProductResponse[]>>(
      `${this.apiUrl}${this.endpoint}/featured`,
      { headers: this.getHeaders() }
    );
  }

  /**
   * Get all categories
   */
  getAllCategories(): Observable<ApiResponse<CategoryResponse[]>> {
    return this.http.get<ApiResponse<CategoryResponse[]>>(
      `${this.apiUrl}${this.endpoint}/categories`,
      { headers: this.getHeaders() }
    );
  }

  /**
   * Get products by category ID
   */
  getProductsByCategory(categoryId: number): Observable<ApiResponse<ProductResponse[]>> {
    return this.http.get<ApiResponse<ProductResponse[]>>(
      `${this.apiUrl}${this.endpoint}/category/${categoryId}`,
      { headers: this.getHeaders() }
    );
  }

  /**
   * Get product details with sizes and add-ons
   */
  getProductDetails(productId: number): Observable<ApiResponse<ProductDetailResponse>> {
    return this.http.get<ApiResponse<ProductDetailResponse>>(
      `${this.apiUrl}${this.endpoint}/${productId}/details`,
      { headers: this.getHeaders() }
    );
  }

  /**
   * Calculate dynamic price based on customization
   */
  calculatePrice(
    request: ProductCustomizationRequest
  ): Observable<ApiResponse<PriceCalculationResponse>> {
    return this.http.post<ApiResponse<PriceCalculationResponse>>(
      `${this.apiUrl}${this.endpoint}/calculate-price`,
      request,
      { headers: this.getHeaders() }
    );
  }
}
