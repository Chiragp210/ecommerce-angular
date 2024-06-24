import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product: any;

  constructor(private route: ActivatedRoute, private http: HttpClient,private cartService: CartService) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.fetchProductDetails(productId);
  }

  fetchProductDetails(productId: string | null): void {
    this.http.get<any>(`http://localhost:3200/api/products/${productId}`)
      .subscribe(
        (response) => {
          this.product = response;
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    console.log('Adding to cart:', product);
  }
}
