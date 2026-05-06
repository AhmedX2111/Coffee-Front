import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { CartItem } from '../../models';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule,MatIconModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPage implements OnInit {
  cart = inject(CartService);

  ngOnInit(): void {
    // Load cart from localStorage - CartService handles this automatically
  }

  getItemTotal(item: CartItem): number {
    const addonsTotal = item.addons.reduce((sum, addon) => sum + addon.price, 0);
    return (item.size.price + addonsTotal) * item.quantity;
  }
}
