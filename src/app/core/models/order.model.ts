import { Product, Size, AddOn } from './product.model';
import { Branch } from './branch.model';

export interface Order {
  id: string;
  customerId: string;
  branchId: string;
  branch?: Branch;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  specialNotes?: string;
  estimatedTime?: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface OrderItem {
  id: string;
  product: Product;
  selectedSize: Size;
  selectedAddOns: AddOn[];
  quantity: number;
  itemPrice: number;
}

export enum OrderStatus {
  PENDING = 'pending',
  RECEIVED = 'received',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface OrderStatusUpdate {
  orderId: string;
  status: OrderStatus;
}
