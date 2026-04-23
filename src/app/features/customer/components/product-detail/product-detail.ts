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
import {
  ProductDetailResponse,
  ProductSize,
  AddOn,
  ProductCustomizationRequest,
  PriceCalculationResponse,
} from '../../../../core/models/product.model';

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
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  product = signal<ProductDetailResponse | null>(null);
  isLoading = signal(false);
  selectedSizeId = signal<number | null>(null);
  selectedAddOnIds = signal<number[]>([]);
  quantity = signal(1);
  priceBreakdown = signal<PriceCalculationResponse>({
    basePrice: 0,
    sizeModifier: 0,
    addOnsTotal: 0,
    totalPrice: 0,
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

  private loadProductDetails(productId: number): void {
    this.isLoading.set(true);
    this.productService.getProductDetails(productId).subscribe({
      next: (response) => {
        if (response.data) {
          this.product.set(response.data);
          // Set default size
          if (response.data.sizes.length > 0) {
            this.selectedSizeId.set(response.data.sizes[0].id);
            this.calculatePrice();
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

  private calculatePrice(): void {
    const prod = this.product();
    if (!prod || !this.selectedSizeId()) return;

    const request: ProductCustomizationRequest = {
      productId: prod.id,
      selectedSizeId: this.selectedSizeId()!,
      selectedAddOnIds: this.selectedAddOnIds(),
    };

    this.productService.calculatePrice(request).subscribe({
      next: (response) => {
        if (response.data) {
          this.priceBreakdown.set(response.data);
        }
      },
      error: () => {
        // Use fallback calculation if API fails
        this.fallbackPriceCalculation();
      },
    });
  }

  private fallbackPriceCalculation(): void {
    const prod = this.product();
    if (!prod) return;

    let totalPrice = prod.basePrice;
    let sizeModifier = 0;
    let addOnsTotal = 0;

    // Add size modifier
    const selectedSize = prod.sizes.find((s) => s.id === this.selectedSizeId());
    if (selectedSize) {
      sizeModifier = selectedSize.priceModifier;
      totalPrice += sizeModifier;
    }

    // Add selected add-ons
    this.selectedAddOnIds().forEach((addonId) => {
      const addon = prod.addOns.find((a) => a.id === addonId);
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
    if (!prod || !this.selectedSizeId()) return;

    // Store in session/cart service and navigate to cart
    // This is a placeholder - integrate with your cart service
    console.log('Adding to cart:', {
      product: prod,
      sizeId: this.selectedSizeId(),
      addOnIds: this.selectedAddOnIds(),
      quantity: this.quantity(),
      totalPrice: this.priceBreakdown().totalPrice * this.quantity(),
    });

    this.router.navigate(['/customer/cart']);
  }

  goBack(): void {
    this.router.navigate(['/customer']);
  }

  onImageError(event: any): void {
    event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23DFD7BF" width="100" height="100"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="14" fill="%233F2305" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
  }
}
