// app.routes.ts

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailsComponent } from './product/product-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login', // Redirect empty path to login page
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  { path: 'product/:id', component: ProductDetailsComponent },
  {
    path: '**', // Handle unknown routes
    redirectTo: '/login'
  }
];
