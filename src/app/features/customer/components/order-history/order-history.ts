import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderHistory {
  orders = signal([
    {
      id: 1,
      orderNumber: '#ORD-001',
      date: '2024-01-15',
      total: 45.99,
      status: 'Completed',
      items: 3,
    },
    {
      id: 2,
      orderNumber: '#ORD-002',
      date: '2024-01-10',
      total: 32.50,
      status: 'Completed',
      items: 2,
    },
    {
      id: 3,
      orderNumber: '#ORD-003',
      date: '2024-01-05',
      total: 28.75,
      status: 'Completed',
      items: 2,
    },
  ]);

  isLoading = signal(false);
}
