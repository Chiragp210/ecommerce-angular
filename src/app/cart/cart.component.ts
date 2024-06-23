import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent{
  cart: any[] = [];
  totalQuantity = 0;
  totalPrice = 0;

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.updateTotals();
    });
  }

  updateTotals() {
    this.totalQuantity = this.cart.reduce((acc, item) => acc + item.quantity, 0);
    this.totalPrice = this.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  handleRemoveFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  handleIncreaseQuantity(productId: string) {
    this.cartService.increaseQuantity(productId);
  }

  handleDecreaseQuantity(productId: string) {
    this.cartService.decreaseQuantity(productId);
  }
}
