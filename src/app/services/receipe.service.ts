import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceipeService {
  private http = inject(HttpClient);

  // Fetch all recipes
  getReceipes(): Observable<any> {
    return this.http.get('http://localhost:8800/api/receipes');
  }

  // Fetch a recipe by ID
  getRecipeById(id: string): Observable<any> {
    return this.http.get(`http://localhost:8800/api/receipes/${id}`);
  }

  // Update a recipe by ID (PATCH request)
  putRecipe(id: string, updatedData: any): Observable<any> {
    return this.http.patch(`http://localhost:8800/api/receipes/${id}`, updatedData);
  }

  // Delete a recipe by ID
  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`http://localhost:8800/api/receipes/${id}`);
  }

  // Create a recipe
postRecipe(recipeData: any) {
  return this.http.post<any>('http://localhost:8800/api/receipes', recipeData);
}

}
