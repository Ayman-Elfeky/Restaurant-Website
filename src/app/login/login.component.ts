import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder);  // Injecting FormBuilder
  authService = inject(AuthService)  
  router = inject(Router)
  loginForm!: FormGroup;  // FormGroup declaration

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Removed 'compose', as it's not necessary
      password: ['', Validators.required],
      // confirmPassword: ['', Validators.required]
    });
  }

  login(){
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        alert('login successfully');
        localStorage.setItem('user_id',res.data._id);
        localStorage.setItem('isAdmin',res.data.isAdmin);
        this.router.navigate(['/home']).then(()=>{
          window.location.reload()
        })
        this.loginForm.reset()
      },
      error: (err) => {
        // Check if there is a specific error message from the backend
        if (err.error && err.error.message) {
          alert(`Error: ${err.error.message}`);  // Display the backend error message
        } else {
          alert('An error occurred. Please try again.');  // Generic fallback message
        }
        console.log(err);  // Log the error for debugging
      }
    })
  }
}

