import { OrderItemResponse } from './order-item-response';

export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: number;
  orderNumber: string;    // "ORD-7721"
  status: OrderStatus;
  branchName: string;
  totalPrice: number;
  notes?: string;
  createdAt: string;
  items: OrderItemResponse[];
}
