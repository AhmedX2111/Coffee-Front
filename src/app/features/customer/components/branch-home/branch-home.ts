import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FeaturedProducts } from '../featured-products/featured-products';

@Component({
  selector: 'app-branch-home',
  standalone: true,
  imports: [CommonModule, FeaturedProducts],
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
              class="btn-secondary px-8 py-3 text-lg font-semibold"
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

      <!-- Featured Products Section -->
      <app-featured-products></app-featured-products>

      <!-- Categories Preview Section -->
      <div class="categories-section py-12">
        <div class="container mx-auto px-4">
          <h2 class="text-4xl font-display font-bold text-primary mb-2 text-center">Our Categories</h2>
          <p class="text-center text-primary/70 mb-8">Explore our wide range of delicious offerings.</p>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            @for (item of categories; track item) {
              <button 
                class="card p-8 text-center hover:shadow-lg transition-all hover:-translate-y-1"
                (click)="navigateToMenu()">
                <div class="text-5xl mb-4">{{ getEmojiFromCategory(item) }}</div>
                <h3 class="text-lg font-semibold text-primary">{{ getCategoryName(item) }}</h3>
              </button>
            }
          </div>

          <div class="text-center mt-8">
            <button 
              class="btn-primary"
              (click)="navigateToMenu()">
              View All Menu
              <span class="material-icons">arrow_forward</span>
            </button>
          </div>
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
export class BranchHome {
  private router = inject(Router);

  categories = [
    { emoji: '☕', name: 'Coffee' },
    { emoji: '🫖', name: 'Tea' },
    { emoji: '🥐', name: 'Bakery' },
    { emoji: '🍰', name: 'Desserts' },
  ];

  navigateToMenu(): void {
    this.router.navigate(['/customer/menu']);
  }

  preOrder(): void {
    // Placeholder for pre-order functionality
    console.log('Pre-order initiated');
  }

  getEmojiFromCategory(category: { emoji: string; name: string }): string {
    return category.emoji;
  }

  getCategoryName(category: { emoji: string; name: string }): string {
    return category.name;
  }
}
