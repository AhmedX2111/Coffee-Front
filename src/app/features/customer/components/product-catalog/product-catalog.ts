import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedProducts } from '../featured-products/featured-products';
import { CategoryBrowsing } from '../category-browsing/category-browsing';
import { ProductList } from '../product-list/product-list';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, FeaturedProducts, CategoryBrowsing, ProductList],
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCatalog {
  selectedCategoryId = signal<number | null>(null);

  onCategorySelected(categoryId: number): void {
    this.selectedCategoryId.set(categoryId);
  }
}
