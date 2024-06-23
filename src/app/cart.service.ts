// src/app/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    if (this.isLocalStorageAvailable()) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartSubject.next(JSON.parse(savedCart));
      }
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  getCart() {
    return this.cartSubject.value;
  }

  addToCart(product: any) {
    const cart = this.getCart();
    const existingProduct = cart.find(item => item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    this.updateCart(cart);
  }

  removeFromCart(productId: string) {
    const cart = this.getCart().filter(item => item._id !== productId);
    this.updateCart(cart);
  }

  increaseQuantity(productId: string) {
    const cart = this.getCart();
    const product = cart.find(item => item._id === productId);
    if (product) {
      product.quantity += 1;
    }
    this.updateCart(cart);
  }

  decreaseQuantity(productId: string) {
    let cart = this.getCart();
    const product = cart.find(item => item._id === productId);
    if (product && product.quantity > 1) {
      product.quantity -= 1;
    } else {
      cart = cart.filter(item => item._id !== productId);
    }
    this.updateCart(cart);
  }

  private updateCart(cart: any[]) {
    this.cartSubject.next(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
