import { Component, Input } from '@angular/core';
import { OrderResponse } from '../../models/OrderItem';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-details-modal',
  imports: [DatePipe],
  templateUrl: './order-details-modal.html',
  styleUrl: './order-details-modal.css',
})
export class OrderDetailsModal {
@Input() order!: OrderResponse;
  @Input() isOpen: boolean = false;
  @Input() close!: () => void;
}
