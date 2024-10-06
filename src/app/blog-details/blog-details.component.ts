import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceipeService } from '../services/receipe.service';
import { CommonModule, Location } from '@angular/common'; // Import Location service

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  private receipeService = inject(ReceipeService);
  private route = inject(ActivatedRoute);
  private location = inject(Location); // Inject Location service
  recipe: any;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get the ID from the URL
    console.log(id)
    this.getRecipeDetails(id!);
  }

  getRecipeDetails(id: string) {
    this.receipeService.getRecipeById(id).subscribe({
      next: (res: any) => {
        this.recipe = res.data; // Store the recipe details
        console.log(this.recipe); // Check if data is correctly received

      },
      error: (err) => {
        console.log('Error fetching recipe details:', err);
      }
    });
  }

  goBack() {
    this.location.back(); // This will navigate back to the previous page
  }
}
