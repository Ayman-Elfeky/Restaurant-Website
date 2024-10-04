import { Component } from '@angular/core';

@Component({
  selector: 'app-book-table',
  standalone: true,
  imports: [],
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.css'
})
export class BookTableComponent {
  e = addEventListener('submit', function(es) {
    es.preventDefault(); // Prevent the default action
    // Your logic for handling the form submission goes here
});

}
