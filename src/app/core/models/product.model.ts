// API Response Types - Actual Backend Structure
export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: CategoryResponse;
  productSizes: ProductSizeResponse[];
}

export interface ProductSizeResponse {
  id: number;
  size: string;
  price: number;
}

export interface CategoryResponse {
  id: number;
  name: string;
  imageUrl?: string;
  addonList?: any[];
  isDeleted?: boolean;
  description?: string;
  icon?: string;
}

// Mapped/Normalized Types for Frontend Use
export interface ProductCardResponse {
  id: number;
  name: string;
  description: string;
  basePrice: number; // smallest size price
  categoryId: number;
  imageUrl: string;
  isFeatured: boolean; // always false for now, unless API provides it
}

export interface ProductDetailResponse {
  id: number;
  name: string;
  description: string;
  basePrice: number; // smallest size price
  imageUrl: string;
  sizes: ProductSize[];
  addOns: AddOn[];
  category: CategoryResponse;
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
