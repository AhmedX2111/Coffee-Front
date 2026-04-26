import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../core/models/auth.model';
import { OrderResponse } from '../../models/OrderItem';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
    private apiUrl = environment.apiBaseUrl;
  
  constructor(private http:HttpClient){}

  getOrdersForOneBranch():Observable<ApiResponse<OrderResponse[]>>{
      return this.http.get<ApiResponse<OrderResponse[]>>(`${this.apiUrl}/api/orders/getOrdersBranch`)
  }
}
