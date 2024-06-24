import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products: any[] = [];

  constructor(private http: HttpClient, private cartService: CartService,private router: Router) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<any[]>('http://localhost:3200/api/products')
      .subscribe(
        (response) => {
          // console.log('Products fetched:', response);
          this.products = response;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }
  

  handleAddToCart(product: any): void {
    this.cartService.addToCart(product);
    console.log('Adding to cart:', product);
  }

  viewProductDetails(product: any): void {
    if (product && product._id) {
      this.router.navigate(['/product', product._id]); // Use product._id
    } else {
      console.error('Invalid product id:', product);
    }
  }
  

}
