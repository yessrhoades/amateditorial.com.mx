import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { TokenService } from 'src/app/services/token.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  countBooks! : number;
  name! :string;
  logged! : boolean;

  constructor(
    private cartService : CartService,
    private router: Router,
    private token: TokenService,
    private authService : AuthService,
    private alertsService : AlertsService,
    private readonly navbarService : NavbarService,
  ) {
    this.navbarService.getLogged().subscribe(logged => {
      this.logged = logged;
    });

    this.navbarService.getName().subscribe(name => {
      this.name = name;
    });
  }

  ngOnInit(): void {
    this.countBooks = this.cartService.getCart().length;
    if (this.token.isLogged()) {
      this.logged =true;
      this.name = this.token.getUserName();
    } else {
      this.logged = false;
      this.name = '';
    }
  }

  sessionClose():void {
    this.authService.logout().subscribe(
      data => {
        window.sessionStorage.clear();
        this.alertsService.success('¡Bien!', data.message);
        this.router.navigate(['/home']);
        this.ngOnInit();
      },
      err => {
        this.alertsService.errors(err);
      }
    );
  }

  clean():void {
    this.cartService.cleanCart();
    this.cartService.innerCountCart();
    this.alertsService.success_reload_to('¡Bien!', 'El carrito de compras se limpió correctamente', 'home');
  }

}
