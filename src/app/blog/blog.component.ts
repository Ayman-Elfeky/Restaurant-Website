import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceipeService } from '../services/receipe.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  receipeService = inject(ReceipeService);
  router = inject(Router);
  recipes: any[] = []; // Array to store recipes
  editingRecipeId: string | null = null; // ID of the recipe being edited
  updatedTitle: string = '';
  updatedDescription: string = '';

  fb = inject(FormBuilder);  // Injecting FormBuilder
  authService = inject(AuthService)  
  registerForm!: FormGroup;  // FormGroup declaration
  isAdmin: boolean = this.authService.isAdmin();

  ngOnInit(): void {
    this.getReceipes();
    this.registerForm = this.fb.group({    
      _id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      preparation: ['', Validators.required],
      category: ['', Validators.required],
      cook_time: ['', Validators.required],
      servings: ['', Validators.required],
      prep_time: ['', Validators.required]
      });
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

  createRecipe() {
    this.receipeService.postRecipe(this.registerForm.value)
    .subscribe({
      next: (res) => {
        alert('Recipe created successfully');
        console.log('Recipe created successfully', res);
        this.getReceipes(); // Refresh the list after creating
      },
      error: (err) => {
        console.log(this.registerForm.value);
        console.error('Error creating recipe', err);
      }
    }); 
  }

  startEditing(recipe: any) {
    // Set the recipe being edited and prefill form with current data
    this.editingRecipeId = recipe._id;
    this.updatedTitle = recipe.title;
    this.updatedDescription = recipe.description;
  }

  cancelEditing() {
    this.editingRecipeId = null;
    this.updatedTitle = '';
    this.updatedDescription = '';
  }

  updateRecipe() {
    if (!this.editingRecipeId) return;

    const updatedData = {
      title: this.updatedTitle,
      description: this.updatedDescription
    };

    this.receipeService.putRecipe(this.editingRecipeId, updatedData).subscribe({
      next: (res) => {
        console.log('Recipe updated successfully', res);
        alert('Recipe Updated Successfully');
        this.getReceipes(); // Refresh the list after update
        this.cancelEditing(); // Hide the edit form after updating
      },
      error: (err) => {
        console.log('The Error is here')
        console.error('Error updating recipe', err);
      }
    });
  }

  deleteRecipe(id: string) {
    this.receipeService.deleteRecipe(id).subscribe({
      next: (res) => {
        console.log('Recipe deleted successfully', res);
        alert('Recipe deleted successfully');
        this.getReceipes(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Error deleting recipe', err);
      }
    });
  }

  viewRecipe(id: string) {
    // Navigate to blog details component with the recipe ID
    this.router.navigate(['/blog-details', id]);
  }
}
