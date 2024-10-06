import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule for ngIf, ngFor
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Fixed typo (was styleUrl)
})
export class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);  // Injecting FormBuilder
  authService = inject(AuthService)  
  router = inject(Router)
  registerForm!: FormGroup;  // FormGroup declaration

  ngOnInit(): void {
    this.registerForm = this.fb.group({    
      firstName: ['', Validators.required], 
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],  // Removed 'compose', as it's not necessary
      password: ['', Validators.required]
      // confirmPassword: ['', Validators.required]
    });
  }

  register() {
    this.authService.registerService(this.registerForm.value)   // send the form value as object
    .subscribe({
      next:(res)=>{
        console.log(this.registerForm.value) 
        alert("user Created Succefully!");  
        // Reset form values after submissions
        this.registerForm.reset();  
        this.router.navigate(['/login']);
      }, 
      error:(err)=> {
        console.log(err);
      }
    })
  }
}
