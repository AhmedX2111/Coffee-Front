import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart-service';
import { CartItem } from '../../models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartPage implements OnInit {
  cart = inject(CartService);

  ngOnInit(): void {
    localStorage.setItem('brew_and_bite_cart', JSON.stringify([
  {
    cartItemId: "abc-123",
    productId: 1,
    productSizeId: 2,
    name: "Caramel Macchiato",
    imageUrl: "https://placehold.co/400",
    size: {
      id: 2,
      name: "Large",
      price: 5.80
    },
    addons: [
      {
        id: 1,
        name: "Whipped Cream",
        price: 0.50
      }
    ],
    quantity: 1
  },
  {
    cartItemId: "def-456",
    productId: 3,
    productSizeId: 4,
    name: "Croissant",
    imageUrl: "https://placehold.co/400",
    size: {
      id: 4,
      name: "Regular",
      price: 3.20
    },
    addons: [],
    quantity: 2
  }
]));
  }

  getItemTotal(item: CartItem): number {
    const addonsTotal = item.addons.reduce((sum, a) => sum + a.price, 0);
    return (item.size.price + addonsTotal) * item.quantity;
  }
}
