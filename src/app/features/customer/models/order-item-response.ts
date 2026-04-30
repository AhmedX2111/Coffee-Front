import { Addon } from './addon';

export interface OrderItemResponse {
  id: number;
  productName: string;
  size: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
  addons: Addon[];
}
