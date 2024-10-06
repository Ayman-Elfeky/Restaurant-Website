import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  router = inject(Router)
  authService = inject(AuthService);
  isLoggedIn: Boolean= this.authService.isloggedIn();

  logout(){
    localStorage.removeItem('user_id');
    this.router.navigate(['/login']).then(()=>{
      window.location.reload()
    })
  }
}
