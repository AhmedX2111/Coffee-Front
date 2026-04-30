import { Component, OnInit, signal } from '@angular/core';
import { OrderService } from '../../services/OrderService/order-service';
import { OrderResponse, OrderStatus } from '../../models/OrderItem';
import { PickupTime } from '../pickup-time/pickup-time';
import { OrderDetailsModal } from '../order-details-modal/order-details-modal';
import { CommonModule } from '@angular/common';
import { SearchOrders } from '../search-orders/search-orders';

@Component({
  selector: 'app-order-card',
  imports: [PickupTime , OrderDetailsModal , CommonModule , SearchOrders],
  templateUrl: './order-card.html',
  styleUrl: './order-card.css',
})
export class OrderCard implements OnInit {

  orders=signal<OrderResponse[]>([])
  selectedOrder = signal<OrderResponse | null>(null);
  isModalOpen = signal(false);
  OrderStatus = OrderStatus;
  constructor(private orderService:OrderService){}
  ngOnInit(): void {
    this.getOrdersForOneBranch()
  }

  getOrdersForOneBranch(search : string = ''){
    this.orderService.getOrdersForOneBranch(search).subscribe((res)=>{
      console.log(res)
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
  this.orderService.changeStatus(id, status).subscribe({
    next: (res) => {
      console.log(res.message);
      this.orders.update(list =>
        list.map(o =>
          o.id === id ? { ...o, status } : o
        )
      );
    },
    error: (err) => {
      console.error(err);
    }
  });
}

onSearch(event:Event){
  const value = (event.target as HTMLInputElement).value
  this.getOrdersForOneBranch(value)
}
} 
