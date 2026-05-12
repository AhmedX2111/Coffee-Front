import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../services/OrderService/order-service';
import { OrderResponse, OrderStatus } from '../../models/OrderItem';
import { OrderDetailsModal } from '../order-details-modal/order-details-modal';
import { SearchOrders } from '../search-orders/search-orders';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrdersTable } from '../orders-table/orders-table';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({ 
  selector: 'app-ready-orders',
  imports: [OrderDetailsModal , SearchOrders , DatePipe , CurrencyPipe , OrdersTable],
  templateUrl: './ready-orders.html',
  styleUrl: './ready-orders.css',
})
export class ReadyOrders implements OnInit {
  orders = signal<OrderResponse[]>([]);
  selectedOrder = signal<OrderResponse | null>(null);
  isModalOpen = signal(false);
  OrderStatus = OrderStatus;
  processingIds = signal<Set<number>>(new Set());
  private toastr = inject(ToastrService)
  
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

changeStatus(id: number, status: OrderStatus) {
    this.processingIds.update(set => new Set(set).add(id));

    this.orderService.changeStatus(id, status)
      .pipe(
        finalize(() => {
          this.processingIds.update(set => {
            const newSet = new Set(set);
            newSet.delete(id);
            return newSet;
          });
        })
      )
      .subscribe({
        next: (res) => {
          this.orders.update(list => list.filter(order => order.id !== id));
          this.toastr.success(res.message);
        },
        error: (err) => {
          console.error('Transaction failed, button re-enabled:', err);
        }
      });
  }
  
  isProcessing(id: number): boolean {
    return this.processingIds().has(id);
  }
  onCompleteOrder(order: OrderResponse) {
    this.changeStatus(order.id, OrderStatus.COMPLETED);
  }
}