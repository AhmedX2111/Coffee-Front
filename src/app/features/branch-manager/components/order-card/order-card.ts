import { Component, OnInit, signal } from '@angular/core';
import { OrderService } from '../../services/OrderService/order-service';
import { OrderResponse } from '../../models/OrderItem';
import { PickupTime } from '../pickup-time/pickup-time';
import { OrderDetailsModal } from '../order-details-modal/order-details-modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-card',
  imports: [PickupTime , OrderDetailsModal , CommonModule],
  templateUrl: './order-card.html',
  styleUrl: './order-card.css',
})
export class OrderCard implements OnInit {

  orders=signal<OrderResponse[]>([])
  selectedOrder = signal<OrderResponse | null>(null);
  isModalOpen = signal(false);
  constructor(private orderService:OrderService){}
  ngOnInit(): void {
    this.getOrdersForOneBranch()
  }

  getOrdersForOneBranch(){
    this.orderService.getOrdersForOneBranch().subscribe((res)=>{
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
} 
