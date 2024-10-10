import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrls } from '../api.Urls';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)

  registerService(registerObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }

  loginService(loginObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }

  isloggedIn(){
    return !!localStorage.getItem('user_id');
  }

  isAdmin(){
    const isAdmin = localStorage.getItem('isAdmin');
    return isAdmin === 'true';
  }
}
