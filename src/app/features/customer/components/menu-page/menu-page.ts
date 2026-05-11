import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { CategoryResponse, ProductCardResponse } from '../../../../core/models/product.model';
import { ProductBrowsingService } from '../../../../core/services/product-browsing.service';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.css',
})
export class MenuPage implements OnInit, OnDestroy {
  private readonly productService = inject(ProductBrowsingService);
  private readonly route = inject(ActivatedRoute);

  categories = signal<CategoryResponse[]>([]);
  products = signal<ProductCardResponse[]>([]);
  isLoading = signal(false);

  selectedCategory = signal<string>('all');
  private queryParamsSubscription?: Subscription;

  filteredProducts = computed(() => {
    const selected = this.selectedCategory();
    if (selected === 'all') {
      return this.products();
    }

    const selectedId = Number(selected);
    return this.products().filter((product) => product.categoryId === selectedId);
  });

  ngOnInit(): void {
    this.loadMenuData();
    this.queryParamsSubscription = this.route.queryParams.subscribe((params) => {
      if (params['category']) {
        this.selectedCategory.set(String(params['category']));
      }
    });
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }

  selectCategory(categoryId: string | number): void {
    this.selectedCategory.set(String(categoryId));
  }

  iconForCategory(category: CategoryResponse): string {
    if (category.icon) {
      return category.icon;
    }

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

  private loadMenuData(): void {
    this.isLoading.set(true);
    this.productService.getAllCategories().subscribe({
      next: (response) => {
        this.categories.set(response.data || []);
      },
    });

    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products.set(response.data || []);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
