import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../services/order-service';
import { Order } from '../../models';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [RouterLink, MatIconModule, DatePipe],
  templateUrl: './orderdetails.html',
  styleUrl: './orderdetails.css'
})
export class OrderDetailsPage implements OnInit {
  route        = inject(ActivatedRoute);
  orderService = inject(OrderService);

  order     = signal<Order | null>(null);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(id).subscribe({
      next: (order) => {
        this.order.set(order);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }
}
