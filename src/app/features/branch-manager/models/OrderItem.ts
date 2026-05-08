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
  updatedAt:string;
  type: OrderType;
  status: OrderStatus;
  pickupTime: string | null;
  products: OrderItem[];
}
export enum OrderType {
  ORDER_NOW = 'ORDER_NOW',
  PRE_ORDER = 'PRE_ORDER'
}
export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}