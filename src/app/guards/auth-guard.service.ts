import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private token: TokenService, private router: Router) { }

  canActivate(): boolean {
    if (!this.token.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
