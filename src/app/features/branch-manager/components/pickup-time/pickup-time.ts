import { Component, Input } from '@angular/core';
import { OrderResponse } from '../../models/OrderItem';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pickup-time',
  imports: [DatePipe],
  templateUrl: './pickup-time.html',
  styleUrl: './pickup-time.css',
})
export class PickupTime {
@Input() order!: OrderResponse;
}
 