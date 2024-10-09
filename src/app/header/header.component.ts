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

  // sideBar = document.querySelector('.sidebar') as HTMLElement;
  // resBar = document.querySelector('.res-bar') as HTMLElement;

  mediaQuery = window.matchMedia('(max-width: 890px)');
  
  showSideBar = ()=> {
    const sideBar = document.querySelector('.sidebar') as HTMLElement;
    const resBar = document.querySelector('.res-bar') as HTMLElement;
    if(this.mediaQuery.matches){
      resBar.style.display = 'none';
      sideBar.style.display = 'flex';
    }else{
      resBar.style.display = 'none';
      sideBar.style.display = 'none';
    }
  }

  hideSideBar = ()=> {
    const sideBar = document.querySelector('.sidebar') as HTMLElement;
    const resBar = document.querySelector('.res-bar') as HTMLElement;
    if(this.mediaQuery.matches){
    resBar.style.display = 'block';
    sideBar.style.display = 'none';
    }else{
      // resBar.style.display = 'none';
      // sideBar.style.display = 'none';
    }
  }

}
