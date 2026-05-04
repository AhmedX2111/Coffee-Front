import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../core/models/auth.model';
import { OrderResponse, OrderStatus } from '../../models/OrderItem';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
    private apiUrl = environment.apiBaseUrl;
  
  constructor(private http:HttpClient){}

  getOrdersForOneBranch(search: string = ''):Observable<ApiResponse<OrderResponse[]>>{
    return this.http.get<ApiResponse<OrderResponse[]>>(`${this.apiUrl}/api/orders/getOrdersBranch?search=${search}`)
}

  changeStatus(id: number, status: OrderStatus) {
  return this.http.put<any>(
    `${this.apiUrl}/api/orders/changeStatus/${id}?orderStatus=${status}`,
    {}
  );
}

getOrdersReadyForOneBranch(search: string = ''): Observable<ApiResponse<OrderResponse[]>> {
    return this.http.get<ApiResponse<OrderResponse[]>>(
      `${this.apiUrl}/api/orders/getOrdersBranchReady?search=${search}`
    );
}

getOrdersCompletedForOneBranch(search: string = ''): Observable<ApiResponse<OrderResponse[]>> {
    return this.http.get<ApiResponse<OrderResponse[]>>(
      `${this.apiUrl}/api/orders/getOrdersBranchCompleted?search=${search}`
    );
}
}
