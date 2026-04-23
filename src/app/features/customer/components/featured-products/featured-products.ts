import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductBrowsingService } from '../../../../core/services/product-browsing.service';
import { ProductResponse } from '../../../../core/models/product.model';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProducts implements OnInit {
  private productService = inject(ProductBrowsingService);
  private router = inject(Router);

  featuredProducts = signal<ProductResponse[]>([]);
  isLoading = signal(false);

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  private loadFeaturedProducts(): void {
    this.isLoading.set(true);
    this.productService.getFeaturedProducts().subscribe({
      next: (response) => {
        if (response.data) {
          this.featuredProducts.set(response.data);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/customer/product', productId]);
  }

  onImageError(event: any): void {
    event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23DFD7BF" width="100" height="100"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="14" fill="%233F2305" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
  }
}
