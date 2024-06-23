import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export class ContactComponent implements OnInit {
  user: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = localStorage.getItem('user');
      let user = null;

      if (userJson) {
        try {
          user = JSON.parse(userJson);
          this.user = user;
          console.log('User details:', this.user);
        } catch (error) {
          console.error('Error parsing user JSON:', error);
          // Optionally, you can remove the corrupted data
          localStorage.removeItem('user');
        }
      } else {
        console.warn('User data not found in localStorage.');
      }
    } else {
      console.warn('LocalStorage is not available in the current environment.');
    }
  }
}
