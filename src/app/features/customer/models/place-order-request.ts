export interface OrderItemAddonRequest {
  addonId: number;
}

export interface OrderItemRequest {
  productSizeId: number;
  quantity: number;
  notes?: string;
  addons: OrderItemAddonRequest[];
}

export interface PlaceOrderRequest {
  branchId: number;
  notes?: string;
  items: OrderItemRequest[];
}
