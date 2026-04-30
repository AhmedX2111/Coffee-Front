import { Component, OnInit, signal } from '@angular/core';
import { OrderService } from '../../services/OrderService/order-service';
import { OrderResponse } from '../../models/OrderItem';
import { OrderDetailsModal } from '../order-details-modal/order-details-modal';
import { SearchOrders } from '../search-orders/search-orders';

@Component({ 
  selector: 'app-completed-orders',
  imports: [OrderDetailsModal , SearchOrders],
  templateUrl: './completed-orders.html',
  styleUrl: './completed-orders.css',
})
export class CompletedOrders implements OnInit {
  orders = signal<OrderResponse[]>([]);
  selectedOrder = signal<OrderResponse | null>(null);
  isModalOpen = signal(false);
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.getOrdersReadyForOneBranchById();
  }
  getOrdersReadyForOneBranchById(search: string = '') {
    this.orderService.getOrdersReadyForOneBranch(search).subscribe((res) => {
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