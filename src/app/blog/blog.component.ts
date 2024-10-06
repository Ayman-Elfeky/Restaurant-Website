import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReceipeService } from '../services/receipe.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  private receipeService = inject(ReceipeService)
  private router = inject(Router)
  recipes: any[] = []; // Array to store recipes

  ngOnInit(): void {
    this.getReceipes();
  }

  getReceipes() {
    this.receipeService.getReceipes()
      .subscribe({
        next: (res: any) => { 
          this.recipes = res.data; // Store the data from backend
        },
        error: (err) => {
          console.log('Error fetching recipes:', err);
        }
      });
  }

  viewRecipe(id: string) {
    // Navigate to blog details component with the recipe ID
    this.router.navigate(['/blog-details', id]);
  }
}
