import { Component, inject, OnInit, ChangeDetectionStrategy, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBrowsingService } from '../../../../core/services/product-browsing.service';
import { CategoryResponse } from '../../../../core/models/product.model';

@Component({
  selector: 'app-category-browsing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="category-section py-8">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-display font-bold text-primary mb-8">Our Categories</h2>

        @if (isLoading()) {
          <div class="flex justify-center py-8">
            <div class="loader"></div>
          </div>
        } @else if (categories().length > 0) {
          <div class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            @for (category of categories(); track category.id) {
              <button 
                class="category-btn snap-center"
                [class.active]="selectedCategoryId() === category.id"
                (click)="selectCategory(category.id)">
                <span class="material-icons icon">{{ getCategoryIcon(category.name) }}</span>
                <span class="whitespace-nowrap">{{ category.name }}</span>
              </button>
            }
          </div>
        } @else {
          <div class="text-center py-8">
            <p class="text-primary/70">No categories available at the moment.</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .category-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      font-weight: 500;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      background-color: #F5F5F5;
      color: #3F2305;
      min-width: fit-content;
      cursor: pointer;
    }

    .category-btn:hover {
      background-color: rgba(223, 215, 191, 0.5);
    }

    .category-btn:active {
      transform: scale(0.95);
    }

    .category-btn.active {
      background-color: #3F2305;
      color: #F5F5F5;
      border-color: #3F2305;
    }

    .icon {
      font-size: 20px;
      display: inline-block;
    }

    .loader {
      border: 3px solid rgba(63, 35, 5, 0.1);
      border-radius: 50%;
      border-top: 3px solid #3F2305;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryBrowsing implements OnInit {
  private productService = inject(ProductBrowsingService);

  categories = signal<CategoryResponse[]>([]);
  selectedCategoryId = signal<number | null>(null);
  isLoading = signal(false);

  categorySelected = output<number>();

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.isLoading.set(true);
    this.productService.getAllCategories().subscribe({
      next: (categories) => {
        if (Array.isArray(categories)) {
          this.categories.set(categories);
          // Select first category by default
          if (categories.length > 0) {
            this.selectCategory(categories[0].id);
          }
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  selectCategory(categoryId: number): void {
    this.selectedCategoryId.set(categoryId);
    this.categorySelected.emit(categoryId);
  }

  getCategoryIcon(categoryName: string): string {
    const icons: Record<string, string> = {
      'Coffee': 'local_cafe',
      'Tea': 'local_cafe',
      'Bakery': 'bakery_dining',
      'Desserts': 'cake',
      'Cold Drinks': 'local_drink',
      'Hot Drinks': 'local_cafe',
      'Pastries': 'bakery_dining',
      'Beverages': 'local_cafe',
    };
    return icons[categoryName] || 'local_cafe';
  }
}
