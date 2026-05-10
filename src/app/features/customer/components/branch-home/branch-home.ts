import { Component, inject, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductBrowsingService } from '../../../../core/services/product-browsing.service';
import { CartService } from '../../services/cart-service';
import { CategoryResponse } from '../../../../core/models/product.model';
import { ProductCardResponse } from '../../../../core/models/product.model';

@Component({
  selector: 'app-branch-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './branch-home.html',
  styleUrl: './branch-home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchHome implements OnInit {
  private router = inject(Router);
  private productService = inject(ProductBrowsingService);
  private cartService = inject(CartService);

  categories = signal<CategoryResponse[]>([]);
  featuredProducts = signal<ProductCardResponse[]>([]);
  isLoadingCategories = signal(false);
  isLoadingProducts = signal(false);

  showTimePicker = signal(false);
  selectedHour = signal('12');
  selectedMinute = signal('00');
  selectedPeriod = signal('PM');

  hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, '0')
  );
  minutes = ['00', '15', '30', '45'];

  ngOnInit(): void {
    this.loadCategories();
    this.loadFeaturedProducts();
  }

  private loadCategories(): void {
    this.isLoadingCategories.set(true);
    this.productService.getAllCategories().subscribe({
      next: (data) => {
        this.categories.set(data.data || []);
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
    this.cartService.setOrderType('ORDER_NOW');
    this.router.navigate(['/customer/menu']);
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/customer/product', productId]);
  }

  preOrder(): void {
    this.showTimePicker.set(true);
  }

  confirmPreOrder(): void {
    const time = `${this.selectedHour()}:${this.selectedMinute()} ${this.selectedPeriod()}`;
    this.cartService.setOrderType('PRE_ORDER', time);
    this.showTimePicker.set(false);
    this.router.navigate(['/customer/menu']);
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
