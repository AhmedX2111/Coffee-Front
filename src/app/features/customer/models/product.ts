import { Size } from './size';
import { Addon } from './addon';

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  isAvailable: boolean;
  categoryId: number;
  sizes: Size[];
  addons: Addon[];
}
