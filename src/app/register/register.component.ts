import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule,HttpClientModule,MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule,MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm: FormGroup;
  submitted = false;
  hide = true;

  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private routes: Router){
      this.registrationForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        address: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
      })
  }


  async onRegister() {
    this.submitted = true;

    try {
      if (this.registrationForm.valid) {
        const formData = this.registrationForm.value;
        this.http.post('http://localhost:3200/api/auth/register', formData).subscribe(
          (response) => {
            alert('Registration successful');
            this.registrationForm.reset();
            this.routes.navigate(['/']);
          },
          (error) => {
            alert('Registration failed!' + error.message);
          }
        );
      } else {
        alert('Form is invalid!');
      }
    } catch (error) {
      alert('Registration failed!' + error);
    }
  }

}
