import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user'|| null;

const LOGIN_STATUS = 'login_status';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  constructor(private router:Router) { }

  signOut() {
  
    localStorage.clear();
    this.router.navigateByUrl('/');
  }


  public setLoginStatus(status: any) {
    sessionStorage.setItem(LOGIN_STATUS, status);
  }

  public getLoginStatus() {
sessionStorage.getItem(LOGIN_STATUS);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any) {
    this.setLoginStatus(true);
   localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return localStorage.getItem(USER_KEY);
  }
}
