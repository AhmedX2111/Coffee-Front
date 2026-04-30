import { Size } from './size';
import { Addon } from './addon';

export interface CartItem {
  cartItemId: string;    // unique local ID (crypto.randomUUID())
  productId: number;
  productSizeId: number; // sent to backend on order confirmation
  name: string;
  imageUrl: string;
  size: Size;
  addons: Addon[];
  quantity: number;
}
