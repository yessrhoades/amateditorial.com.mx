import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class cartGuardService implements CanActivate {

  constructor(
    private router: Router,
    private cartService : CartService
  ) { }

  canActivate(): boolean {
    if (this.cartService.getCart().length == 0) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
