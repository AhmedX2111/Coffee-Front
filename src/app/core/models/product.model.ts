export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  category: Category;
  sizes: Size[];
  addOns: AddOn[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Size {
  id: string;
  name: string;
  priceModifier: number;
}

export interface AddOn {
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
