import { Component, signal } from '@angular/core';
import { OrderResponse, OrderStatus } from '../../models/OrderItem';
import { OrderService } from '../../services/OrderService/order-service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { OrderDetailsModal } from '../order-details-modal/order-details-modal';
import { SearchOrders } from '../search-orders/search-orders';
import { OrdersTable } from '../orders-table/orders-table';

@Component({
  selector: 'app-completed-orders',
  imports: [OrderDetailsModal , SearchOrders , DatePipe , CurrencyPipe , OrdersTable],
  templateUrl: './completed-orders.html',
  styleUrl: './completed-orders.css',
})
export class CompletedOrders {

  orders = signal<OrderResponse[]>([]);
  selectedOrder = signal<OrderResponse | null>(null);
  isModalOpen = signal(false);

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrdersCompletedForOneBranchById();
  }

  getOrdersCompletedForOneBranchById(search: string = '') {
    this.orderService.getOrdersCompletedForOneBranch(search).subscribe((res) => {
      this.orders.set(res.data);
    });
  }

  openModal(order: OrderResponse) {
    this.selectedOrder.set(order);
    this.isModalOpen.set(true);
  }

  closeModal = () => {
    this.isModalOpen.set(false);
  };

}
