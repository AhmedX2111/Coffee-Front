import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  ProductResponse,
  ProductCardResponse,
  CategoryResponse,
  ProductDetailResponse,
  ProductCustomizationRequest,
  PriceCalculationResponse,
  ProductSize,
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
  private publicEndpoint = '/api/products';
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
   * Map API ProductResponse to ProductCardResponse for listings
   */
  private mapToProductCard(product: ProductResponse): ProductCardResponse {
    // Get the smallest price from productSizes
    const basePrice = product.productSizes && product.productSizes.length > 0
      ? Math.min(...product.productSizes.map(s => s.price))
      : 0;

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      basePrice,
      categoryId: product.category?.id || 0,
      imageUrl: product.imageUrl,
      isFeatured: false, // API doesn't provide this, default to false
    };
  }

  /**
   * Map API ProductResponse to ProductDetailResponse
   */
  private mapToProductDetail(product: ProductResponse): ProductDetailResponse {
    // Get the smallest price from productSizes
    const basePrice = product.productSizes && product.productSizes.length > 0
      ? Math.min(...product.productSizes.map(s => s.price))
      : 0;

    // Map productSizes to ProductSize format
    const sizes: ProductSize[] = product.productSizes?.map((ps, index) => ({
      id: ps.id,
      name: ps.size,
      priceModifier: ps.price - basePrice, // Calculate modifier based on smallest price
    })) || [];

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      basePrice,
      imageUrl: product.imageUrl,
      sizes,
      addOns: [], // API doesn't provide add-ons, default to empty
      category: product.category,
    };
  }

  /**
   * Get all products (public endpoint)
   */
  getAllProducts(): Observable<ApiResponse<ProductCardResponse[]>> {
    return this.http.get<ApiResponse<ProductResponse[]>>(
      `${this.apiUrl}${this.publicEndpoint}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => ({
        ...response,
        data: response.data?.map(p => this.mapToProductCard(p)) || [],
      }))
    );
  }

  /**
   * Get featured products for landing page
   */
  getFeaturedProducts(): Observable<ApiResponse<ProductCardResponse[]>> {
    return this.getAllProducts();
  }

  /**
   * Get all categories
   */
  getAllCategories(): Observable<ApiResponse<CategoryResponse[]>> {
    return this.http.get<ApiResponse<CategoryResponse[]>>(
      `${this.apiUrl}/api/category`
    );
  }

  /**
   * Get a single category by ID
   */
  getCategoryById(categoryId: number): Observable<ApiResponse<CategoryResponse>> {
    return this.http.get<ApiResponse<CategoryResponse>>(
      `${this.apiUrl}/api/category/${categoryId}`,
      { headers: this.getHeaders() }
    );
  }

  /**
   * Get products by category ID
   */
  getProductsByCategory(categoryId: number): Observable<ApiResponse<ProductCardResponse[]>> {
    return this.getAllProducts().pipe(
      map(response => ({
        ...response,
        data: response.data?.filter(p => p.categoryId === categoryId) || [],
      }))
    );
  }

  /**
   * Get product details with sizes and add-ons (public endpoint)
   */
  getProductDetails(productId: number): Observable<ApiResponse<ProductDetailResponse>> {
    return this.http.get<ApiResponse<ProductResponse>>(
      `${this.apiUrl}${this.publicEndpoint}/${productId}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => ({
        ...response,
        data: response.data ? this.mapToProductDetail(response.data) : undefined,
      }))
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
