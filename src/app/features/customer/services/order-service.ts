import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Order, PlaceOrderRequest, ApiResponse } from '../models';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/api/orders`;

  placeOrder(request: PlaceOrderRequest): Observable<Order> {
    return this.http.post<ApiResponse<Order>>(this.apiUrl, request).pipe(
      map(response => response.data)
    );
  }

  getMyOrders(): Observable<Order[]> {
    return this.http.get<ApiResponse<Order[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<ApiResponse<Order>>(`${this.apiUrl}/${orderId}`).pipe(
      map(response => response.data)
    );
  }
}
