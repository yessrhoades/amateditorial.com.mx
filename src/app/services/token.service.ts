import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//variables que se guardaran en el navegador
const TOKEN_KEY = "AuthToken";
const USERNAME_KEY = "AuthUserName";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router : Router,
  ) { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY)!;
  }

  public setUserName(username: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUserName(): string {
    return window.sessionStorage.getItem(USERNAME_KEY)!;
  }

  public validateSession():void {
    if(!this.getToken()) this.router.navigate(["/login"]);
  }

  public isLogged(): boolean {
    if (this.getToken()) return true;
    return false;
  }

}
