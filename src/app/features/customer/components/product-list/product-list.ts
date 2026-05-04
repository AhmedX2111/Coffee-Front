import { Component, inject, input, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductBrowsingService } from '../../../../core/services/product-browsing.service';
import { ProductCardResponse } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  private productService = inject(ProductBrowsingService);
  private router = inject(Router);

  categoryId = input.required<number>();

  products = signal<ProductCardResponse[]>([]);
  isLoading = signal(false);

  constructor() {
    effect(() => {
      const catId = this.categoryId();
      if (catId) {
        this.loadProductsByCategory(catId);
      }
    });
  }

  private loadProductsByCategory(categoryId: number): void {
    this.isLoading.set(true);
    this.productService.getProductsByCategory(categoryId).subscribe({
      next: (response) => {
        if (response.data) {
          this.products.set(response.data);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/customer/product', productId]);
  }

  addToCart(product: ProductCardResponse): void {
    // Navigate to product details with a flag to open customization
    this.router.navigate(['/customer/product', product.id], {
      queryParams: { customize: true },
    });
  }

  onImageError(event: any): void {
    event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23DFD7BF" width="100" height="100"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="14" fill="%233F2305" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
  }
}
