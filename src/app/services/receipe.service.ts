import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceipeService {
  private http = inject(HttpClient)

  getReceipes(){
    return this.http.get('http://localhost:8800/api/receipes')
  }

    // Fetch a recipe by ID
  getRecipeById(id: string) {
      return this.http.get(`http://localhost:8800/api/receipes/${id}`);
  }
}
