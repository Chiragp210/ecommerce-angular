import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl , FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { finalize } from 'rxjs/operators'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule,CommonModule, MatButtonModule, RouterLink,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  hide = true; 
  isLoading = false;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }

  // Getter for easy access to form fields in template
  get f() { return this.loginForm.controls; }

  async onLogin() {
    this.submitted = true;

    try {
      if (this.loginForm.valid) {
        this.isLoading = true;
        const formData = this.loginForm.value;
        this.http.post<any>('http://localhost:3200/api/auth/login', formData)
          .pipe(
            finalize(() => { this.isLoading = false; }) // Stop loading indicator regardless of success or error
          )
          .subscribe(
            (response) => {
              alert('Login successful');
              localStorage.setItem('token', response.token); // Store token in local storage
              localStorage.setItem('user', JSON.stringify(response.user)); // Store user in local storage

              this.router.navigate(['/home']);
            },
            (error) => {
              alert('Login failed! Please try again');
            }
          );
      } else {
        alert('Form is invalid!');
      }
    } catch (error) {
      alert('Login failed!' + error);
    }
  }

 

}
