import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductBrowsingService } from '../../../../core/services/product-browsing.service';
import { CartService } from '../../services/cart-service';
import {
  ProductDetailResponse,
  ProductSize,
  ProductCustomizationRequest,
  PriceCalculationResponse,
} from '../../../../core/models/product.model';
import { CartItem, Addon, AddonCategory } from '../../models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail implements OnInit {
  private productService = inject(ProductBrowsingService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  product = signal<ProductDetailResponse | null>(null);
  isLoading = signal(false);
  selectedSizeId = signal<number | null>(null);
  selectedAddOnIds = signal<number[]>([]);
  quantity = signal(1);
  expandedCategories = signal<Set<string>>(new Set()); // Will add category when product loads

  priceBreakdown = signal<PriceCalculationResponse>({
    basePrice: 0,
    sizeModifier: 0,
    addOnsTotal: 0,
    totalPrice: 0,
  });

  

  // Group add-ons by the product's category
  addonsByCategory = computed<AddonCategory[]>(() => {
    const prod = this.product();
    if (!prod || !prod.category || !prod.category.addonList || prod.category.addonList.length === 0) return [];

    return [
      {
        name: `${prod.category.name} Add-ons`,
        addons: prod.category.addonList
      }
    ];
  });

  // Expose for template
  selectedSize = this.selectedSizeId;
  Math = Math;

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProductDetails(parseInt(productId, 10));
    }
  }

  
  /**
   * Toggle category expansion
   */
  toggleCategory(categoryName: string): void {
    const current = new Set(this.expandedCategories());
    if (current.has(categoryName)) {
      current.delete(categoryName);
    } else {
      current.add(categoryName);
    }
    this.expandedCategories.set(current);
  }

  /**
   * Check if category is expanded
   */
  isCategoryExpanded(categoryName: string): boolean {
    return this.expandedCategories().has(categoryName);
  }

  private loadProductDetails(productId: number): void {
    this.isLoading.set(true);
    this.productService.getProductDetails(productId).subscribe({
      next: (response) => {
        if (response.data) {
          const productData = response.data;
          this.product.set(productData);

          // Set default size
          if (productData.sizes.length > 0) {
            this.selectedSizeId.set(productData.sizes[0].id);
            this.calculatePrice();
          }

          // Fetch the full category to ensure we have the addonList
          if (productData.category?.id) {
            this.productService.getCategoryById(productData.category.id).subscribe({
              next: (catResponse) => {
                // If API returns wrapped response or direct:
                const categoryData = catResponse.data || (catResponse as any);
                if (categoryData) {
                  // Fallback to addons array if addonList is missing
                  if (!categoryData.addonList && categoryData.addons) {
                    categoryData.addonList = categoryData.addons;
                  }
                  // Merge full category into product
                  this.product.update(p => p ? { ...p, category: categoryData } : null);
                  this.expandedCategories.update(s => new Set([...s, `${categoryData.name} Add-ons`]));
                }
              }
            });
          }
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  onSizeChange(): void {
    this.calculatePrice();
  }

  onAddOnsChange(): void {
    this.calculatePrice();
  }

  toggleAddon(addonId: number): void {
    const currentIds = this.selectedAddOnIds();
    if (currentIds.includes(addonId)) {
      // Remove addon
      this.selectedAddOnIds.set(currentIds.filter(id => id !== addonId));
    } else {
      // Add addon
      this.selectedAddOnIds.set([...currentIds, addonId]);
    }
    this.calculatePrice();
  }

  private calculatePrice(): void {
    const prod = this.product();
    if (!prod) return;

    let totalPrice = prod.basePrice;
    let sizeModifier = 0;
    let addOnsTotal = 0;

    // The selected size ID might be a string from the radio button binding
    const currentSizeId = Number(this.selectedSizeId());

    // Add size modifier
    const selectedSize = prod.sizes.find((s) => s.id === currentSizeId);
    if (selectedSize) {
      sizeModifier = selectedSize.priceModifier;
      totalPrice += sizeModifier;
    }

    // Add selected add-ons from API-fetched list
    const categoryAddons = prod.category?.addonList || [];
    this.selectedAddOnIds().forEach((addonId) => {
      // Find the addon in the original data structure
      const addon = categoryAddons.find((a: any) => Number(a.id) === Number(addonId));
      if (addon) {
        addOnsTotal += addon.price;
        totalPrice += addon.price;
      }
    });

    this.priceBreakdown.set({
      basePrice: prod.basePrice,
      sizeModifier,
      addOnsTotal,
      totalPrice: Math.max(0, totalPrice),
    });
  }

  // Get Name for the UI
  getSelectedSizeName(): string {
    const sizeId = Number(this.selectedSizeId());
    if (!sizeId) return 'Size Modifier';
    const prod = this.product();
    const size = prod?.sizes.find(s => s.id === sizeId);
    return size ? size.name : 'Size Modifier';
  }

  increaseQuantity(): void {
    this.quantity.update((q) => q + 1);
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }

  addToCart(): void {
    const prod = this.product();
    const rawSizeId = this.selectedSizeId();
    
    if (!prod || !rawSizeId) return;

    const sizeId = Number(rawSizeId);

    // Find the selected size
    const selectedSize = prod.sizes.find(s => s.id === sizeId);
    if (!selectedSize) return;

    // Find the selected add-ons from the category addon list
    const categoryAddons = prod.category?.addonList || [];
    const selectedAddOns = this.selectedAddOnIds()
      .map(id => categoryAddons.find((ao: any) => Number(ao.id) === Number(id)))
      .filter((ao): ao is Addon => ao !== undefined);

    // Calculate actual price for this size
    const sizePrice = selectedSize.priceModifier + prod.basePrice;

    // Create cart item
    const cartItem: CartItem = {
      cartItemId: crypto.randomUUID(),
      productId: prod.id,
      productSizeId: sizeId,
      name: prod.name,
      imageUrl: prod.imageUrl,
      size: {
        id: sizeId,
        name: selectedSize.name,
        price: sizePrice,
      },
      addons: selectedAddOns.map(ao => ({
        id: ao.id,
        name: ao.name,
        price: ao.price,
      })),
      quantity: this.quantity(),
    };

    // Add to cart service
    this.cartService.addToCart(cartItem);

    // Navigate to cart
    this.router.navigate(['/customer/cart']);
  }

  goBack(): void {
    this.router.navigate(['/customer']);
  }

  onImageError(event: any): void {
    event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23DFD7BF" width="100" height="100"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="14" fill="%233F2305" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
  }
}
