import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Check if localStorage is available in the current platform context
      return !!localStorage.getItem('token');
    }
    return false; // Return false if localStorage is not available
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token'); // Remove token from localStorage
      localStorage.removeItem('user');// Remove user from localStorage
    }
    this.router.navigate(['/login']); // Always navigate to login page after logout
  }
}
