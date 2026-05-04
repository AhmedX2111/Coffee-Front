import { Component, inject, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductBrowsingService } from '../../../../core/services/product-browsing.service';
import { CategoryResponse } from '../../../../core/models/product.model';
import { ProductCardResponse } from '../../../../core/models/product.model';

@Component({
  selector: 'app-branch-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="branch-home">
      <!-- Hero Section -->
      <div class="hero-section min-h-96 relative overflow-hidden rounded-3xl mx-4 md:mx-8 my-8"
           style="background: linear-gradient(135deg, rgba(63, 35, 5, 0.8), rgba(223, 215, 191, 0.6)), url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 400%22%3E%3Crect fill=%22%233F2305%22 width=%221200%22 height=%22400%22/%3E%3C/svg%3E'); background-size: cover; background-position: center;">
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 class="text-6xl font-display font-bold text-secondary mb-4">Crafting Perfect Moments</h1>
          <p class="text-xl text-secondary/90 mb-8 max-w-2xl">
            Experience the finest coffee and freshest bites in a warm, minimal space designed for your comfort.
          </p>
          <div class="flex gap-4 flex-wrap justify-center">
            <button 
              class="btn-secondary px-8 py-3 text-lg font-semibold flex items-center gap-2"
              (click)="navigateToMenu()">
              <span class="material-icons">shopping_cart</span>
              <span>Order Now</span>
            </button>
            <button 
              class="bg-surface/80 text-primary px-8 py-3 rounded-xl font-semibold transition-all hover:bg-surface flex items-center gap-2"
              (click)="preOrder()">
              <span class="material-icons">schedule</span>
              <span>Pre-order</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Categories Section -->
      <div class="categories-section py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center mb-12">
            <div>
              <h2 class="text-4xl font-display font-bold text-primary mb-2">Our Categories</h2>
              <p class="text-primary/70">Explore our wide range of delicious offerings.</p>
            </div>
            <button 
              class="btn-primary flex items-center gap-2"
              (click)="navigateToMenu()">
              View All Menu
              <span class="material-icons">arrow_forward</span>
            </button>
          </div>

          @if (isLoadingCategories()) {
            <div class="flex justify-center py-8">
              <div class="loader"></div>
            </div>
          } @else if (categories().length > 0) {
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              @for (category of categories(); track category.id) {
                <button 
                  class="card p-8 text-center hover:shadow-lg transition-all hover:-translate-y-1"
                  (click)="navigateToMenu()">
                  <div class="text-5xl mb-4">{{ getCategoryEmoji(category.name) }}</div>
                  <h3 class="text-lg font-semibold text-primary">{{ category.name }}</h3>
                </button>
              }
            </div>
          }
        </div>
      </div>

      <!-- Featured Delights Section -->
      <div class="featured-section py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-display font-bold text-primary mb-2">Featured Delights</h2>
            <p class="text-primary/70">Handpicked favorites from our expert baristas.</p>
          </div>

          @if (isLoadingProducts()) {
            <div class="flex justify-center py-12">
              <div class="loader"></div>
            </div>
          } @else if (featuredProducts().length > 0) {
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              @for (product of featuredProducts(); track product.id) {
                <div class="card hover:shadow-lg transition-shadow cursor-pointer"
                     (click)="viewProduct(product.id)">
                  <div class="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                    <img 
                      [src]="product.imageUrl" 
                      [alt]="product.name"
                      class="w-full h-full object-cover"
                      (error)="onImageError(\$event)"
                    />
                    <div class="absolute top-3 right-3 bg-secondary text-primary px-3 py-1 rounded-full text-sm font-medium">
                      \$ {{ product.basePrice.toFixed(2) }}
                    </div>
                  </div>

                  <div class="p-5">
                    <h3 class="text-lg font-semibold text-primary mb-2">{{ product.name }}</h3>
                    <p class="text-sm text-primary/70 mb-4 line-clamp-2">{{ product.description }}</p>
                    <button 
                      class="btn-secondary w-full"
                      (click)="viewProduct(product.id); \$event.stopPropagation()">
                      View Details
                    </button>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </div>

      <!-- Call to Action Section -->
      <div class="cta-section bg-primary rounded-3xl py-16 mx-4 md:mx-8 my-8 text-center">
        <h2 class="text-4xl font-display font-bold text-surface mb-4">Ready to take a sip?</h2>
        <p class="text-lg text-surface/90 mb-8 max-w-2xl mx-auto">
          Join thousands of coffee lovers and start your journey with Brew & Bite today.
        </p>
        <button 
          class="bg-secondary text-primary px-8 py-3 rounded-xl font-semibold text-lg hover:bg-secondary/90 transition-all"
          (click)="navigateToMenu()">
          Order Now
        </button>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      box-shadow: 0 10px 40px rgba(63, 35, 5, 0.2);
    }

    .categories-section {
      background: linear-gradient(135deg, rgba(242, 234, 211, 0.5) 0%, rgba(245, 245, 245, 0.5) 100%);
    }

    .cta-section {
      box-shadow: 0 10px 40px rgba(63, 35, 5, 0.15);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchHome implements OnInit {
  private router = inject(Router);
  private productService = inject(ProductBrowsingService);

  categories = signal<CategoryResponse[]>([]);
  featuredProducts = signal<ProductCardResponse[]>([]);
  isLoadingCategories = signal(false);
  isLoadingProducts = signal(false);

  ngOnInit(): void {
    this.loadCategories();
    this.loadFeaturedProducts();
  }

  private loadCategories(): void {
    this.isLoadingCategories.set(true);
    this.productService.getAllCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.isLoadingCategories.set(false);
      },
      error: () => {
        this.isLoadingCategories.set(false);
      },
    });
  }

  private loadFeaturedProducts(): void {
    this.isLoadingProducts.set(true);
    this.productService.getFeaturedProducts().subscribe({
      next: (response) => {
        if (response.data) {
          this.featuredProducts.set(response.data.slice(0, 4));
        }
        this.isLoadingProducts.set(false);
      },
      error: () => {
        this.isLoadingProducts.set(false);
      },
    });
  }

  navigateToMenu(): void {
    this.router.navigate(['/customer/menu']);
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/customer/product', productId]);
  }

  preOrder(): void {
    console.log('Pre-order initiated');
  }

  getCategoryEmoji(categoryName: string): string {
    const emojiMap: { [key: string]: string } = {
      'Coffee': '☕',
      'Tea': '🫖',
      'Bakery': '🥐',
      'Desserts': '🍰',
      'Breakfast': '🥐',
      'Beverages': '🍵',
      'Snacks': '🥜',
    };
    return emojiMap[categoryName] || '🍽️';
  }

  onImageError(event: any): void {
    event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23DFD7BF" width="100" height="100"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="14" fill="%233F2305" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
  }
}
