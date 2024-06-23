import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products: any[] = [];

  constructor(private http: HttpClient, private cartService: CartService) {}

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

}
