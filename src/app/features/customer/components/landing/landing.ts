import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CategoryResponse, ProductCardResponse } from '../../../../core/models/product.model';
import { ProductBrowsingService } from '../../../../core/services/product-browsing.service';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing implements OnInit {
  private router = inject(Router);
  private cartService = inject(CartService);
  private productService = inject(ProductBrowsingService);
 
  showTimePicker = signal(false);
  isLoading = signal(false);
  categories = signal<CategoryResponse[]>([]);
  featuredProducts = signal<ProductCardResponse[]>([]);
 
  selectedHour = '12';
  selectedMinute = '00';
  selectedPeriod = 'PM';
 
  hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  minutes = ['00', '15', '30', '45'];
 
  ngOnInit(): void {
    this.loadLandingData();
  }
 
  confirmPreOrder(): void {
    const time = `${this.selectedHour}:${this.selectedMinute} ${this.selectedPeriod}`;
    this.cartService.setOrderType('PRE_ORDER', time);
    this.showTimePicker.set(false);
    this.router.navigate(['/customer/menu']);
  }
 
  navigateToMenu(): void {
    this.cartService.setOrderType('ORDER_NOW');
    this.router.navigate(['/customer/menu']);
  }
 
  viewProduct(productId: number): void {
    this.router.navigate(['/customer/product', productId]);
  }
 
  goToCategory(categoryId: number): void {
    this.router.navigate(['/customer/menu'], { queryParams: { category: categoryId } });
  }
 
  iconForCategory(category: CategoryResponse): string {
    if (category.icon) return category.icon;
    const name = category.name.toLowerCase();
    if (name.includes('coffee') || name.includes('hot')) return 'local_cafe';
    if (name.includes('cold') || name.includes('drink')) return 'local_drink';
    if (name.includes('pastry') || name.includes('bakery')) return 'bakery_dining';
    if (name.includes('dessert')) return 'cake';
    return 'restaurant_menu';
  }
 
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src =
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23DFD7BF" width="100%25" height="100%25"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="18" fill="%233F2305" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
  }
 
  private loadLandingData(): void {
    this.isLoading.set(true);
 
    this.productService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data || []);
      },
    });
 
    this.productService.getFeaturedProducts().subscribe({
      next: (res) => {
        this.featuredProducts.set((res.data || []).slice(0, 4));
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
