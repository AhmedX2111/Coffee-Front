import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models';

const CART_KEY = 'brew_and_bite_cart';

@Injectable({ providedIn: 'root' })
export class CartService {

  // ─── State ────────────────────────────────────────────────────────
  items = signal<CartItem[]>(this.loadFromStorage());

  // ─── Computed ─────────────────────────────────────────────────────
  count = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  total = computed(() =>
    this.items().reduce((sum, item) => {
      const addonsTotal = item.addons.reduce((a, b) => a + b.price, 0);
      return sum + (item.size.price + addonsTotal) * item.quantity;
    }, 0)
  );

  // ─── Add to Cart ──────────────────────────────────────────────────
  addToCart(item: CartItem): void {
    const current = this.items();

    // Same productSizeId + same addons → increment quantity
    const existingIndex = current.findIndex(i =>
      i.productSizeId === item.productSizeId &&
      JSON.stringify([...i.addons.map(a => a.id)].sort()) ===
      JSON.stringify([...item.addons.map(a => a.id)].sort())
    );

    if (existingIndex !== -1) {
      const updated = [...current];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + item.quantity
      };
      this.updateState(updated);
    } else {
      this.updateState([...current, item]);
    }
  }

  // ─── Update Quantity ──────────────────────────────────────────────
  updateQuantity(cartItemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(cartItemId);
      return;
    }
    const updated = this.items().map(i =>
      i.cartItemId === cartItemId ? { ...i, quantity } : i
    );
    this.updateState(updated);
  }

  // ─── Remove Item ──────────────────────────────────────────────────
  removeFromCart(cartItemId: string): void {
    this.updateState(this.items().filter(i => i.cartItemId !== cartItemId));
  }

  // ─── Clear Cart ───────────────────────────────────────────────────
  clearCart(): void {
    this.updateState([]);
  }

  // ─── Build PlaceOrderRequest items ────────────────────────────────
  // Called by CheckoutPage before POSTing to backend
  toOrderItems() {
    return this.items().map(item => ({
      productSizeId: item.productSizeId,
      quantity: item.quantity,
      notes: undefined,
      addons: item.addons.map(a => ({ addonId: a.id }))
    }));
  }

  // ─── Private Helpers ──────────────────────────────────────────────
  private updateState(items: CartItem[]): void {
    this.items.set(items);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
