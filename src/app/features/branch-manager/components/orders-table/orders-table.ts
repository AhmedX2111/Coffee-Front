import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderResponse } from '../../models/OrderItem';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders-table',
  imports: [DatePipe],
  templateUrl: './orders-table.html',
  styleUrl: './orders-table.css',
})
export class OrdersTable {
 @Input() orders: OrderResponse[] = [];
  @Input() showCompleteButton = false;
  @Output() viewOrder = new EventEmitter<OrderResponse>();
  @Output() completeOrder = new EventEmitter<OrderResponse>();
}
