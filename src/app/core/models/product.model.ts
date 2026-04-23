// API Response Types
export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  categoryId: number;
  imageUrl: string;
  isFeatured: boolean;
}

export interface CategoryResponse {
  id: number;
  name: string;
  description: string;
  icon?: string;
}

export interface ProductDetailResponse {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  sizes: ProductSize[];
  addOns: AddOn[];
}

export interface ProductSize {
  id: number;
  name: string;
  priceModifier: number;
}

export interface AddOn {
  id: number;
  name: string;
  price: number;
}

// Request Types
export interface ProductCustomizationRequest {
  productId: number;
  selectedSizeId: number;
  selectedAddOnIds: number[];
}

export interface PriceCalculationResponse {
  basePrice: number;
  sizeModifier: number;
  addOnsTotal: number;
  totalPrice: number;
}

// Local Models (backward compatibility)
export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  category: Category;
  sizes: Size[];
  addOns: AddOnLegacy[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Size {
  id: string;
  name: string;
  priceModifier: number;
}

export interface AddOnLegacy {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
  isActive: boolean;
}
