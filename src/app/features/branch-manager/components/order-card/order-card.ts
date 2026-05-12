import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../services/OrderService/order-service';
import { OrderResponse, OrderStatus } from '../../models/OrderItem';
import { PickupTime } from '../pickup-time/pickup-time';
import { OrderDetailsModal } from '../order-details-modal/order-details-modal';
import { CommonModule } from '@angular/common';
import { SearchOrders } from '../search-orders/search-orders';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-card',
  imports: [PickupTime , OrderDetailsModal , CommonModule , SearchOrders ],
  templateUrl: './order-card.html',
  styleUrl: './order-card.css',
})
export class OrderCard implements OnInit {

  orders=signal<OrderResponse[]>([])
  selectedOrder = signal<OrderResponse | null>(null);
  isModalOpen = signal(false);
  OrderStatus = OrderStatus;
  processingIds = signal<Set<number>>(new Set());
  private toastr = inject(ToastrService)

  constructor(private orderService:OrderService){}
  
  ngOnInit(): void {
    this.getOrdersForOneBranch()
  }

  getOrdersForOneBranch(search : string = ''){
    this.orderService.getOrdersForOneBranch(search).subscribe((res)=>{
      this.orders.set(res.data)
    })
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
          this.orders.update(list => 
            list
              .map(order => order.id === id ? { ...order, status } : order)
              .filter(order => order.status !== OrderStatus.READY)
          );
          this.toastr.success(res.message)
        },
        error: (err) => {
          console.error('Transaction failed, button re-enabled:', err);
        }
      });
  }
  
  isProcessing(id: number): boolean {
    return this.processingIds().has(id);
  }

/* onSearch(event:Event){
  const value = (event.target as HTMLInputElement).value
  this.getOrdersForOneBranch(value)
} */
}
