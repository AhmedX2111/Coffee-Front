import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { BranchService } from '../../services/branch-service';
import { OrderService } from '../../services/order-service';
import { Branch, CartItem, PlaceOrderRequest } from '../../models';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, MatIconModule, FormsModule, CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutPage implements OnInit {
  cart          = inject(CartService);
  router        = inject(Router);
  branchService = inject(BranchService);
  orderService  = inject(OrderService);

  branches       = signal<Branch[]>([]);
  selectedBranch = signal<Branch | null>(null);
  isLoading      = signal<boolean>(false);
  notes          = '';                          // plain string — works with ngModel

  ngOnInit(): void {
    this.branchService.getAll().subscribe({
      next: (branches) => {
        this.branches.set(branches);
        if (branches.length > 0) {
          this.selectedBranch.set(branches[0]);
        }
      }
      // no error handler needed — ErrorInterceptor + toastr handles it
    });
  }

  selectBranch(branch: Branch): void {
    this.selectedBranch.set(branch);
  }

  getItemTotal(item: CartItem): number {
    const addonsTotal = item.addons.reduce((sum, a) => sum + a.price, 0);
    return (item.size.price + addonsTotal) * item.quantity;
  }

  confirmOrder(): void {
    if (!this.selectedBranch() || this.cart.items().length === 0) return;

    this.isLoading.set(true);

    const request: PlaceOrderRequest = {
      branchId: this.selectedBranch()!.id,
      notes: this.notes,
      type: this.cart.orderType(),
      pickupTime: this.cart.pickupTime() || undefined,
      items: this.cart.toOrderItems()
    };

    this.orderService.placeOrder(request).subscribe({
      next: () => {
        this.cart.clearCart();
        this.router.navigate(['/customer/orders']);
      },
      error: () => this.isLoading.set(false)
      // toastr error message shown by ErrorInterceptor
    });
  }
}
