export interface OrderItem {
  productName: string;
  size: string;
  quantity: number;
  unitPrice: number;
  itemTotalPrice: number;
  addons: string[];
}

export interface OrderResponse {
  id: number;
  orderNumber: string;
  totalPrice: number;
  createdAt: string;
  type: OrderType;
  pickupTime: string | null;
  products: OrderItem[];
}
export enum OrderType {
  ORDER_NOW = 'ORDER_NOW',
  PRE_ORDER = 'PRE_ORDER'
}