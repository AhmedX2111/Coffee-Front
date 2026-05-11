export interface Addon {
  id: number;
  name: string;
  price: number;
  category?: string; // Optional: for grouping add-ons
}

export interface AddonCategory {
  name: string;
  addons: Addon[];
}
