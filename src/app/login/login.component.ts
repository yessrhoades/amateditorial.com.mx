import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
import { debounceTime } from 'rxjs';
import { UserLogin } from '../models/user-login';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { NavbarService } from '../components/navbar/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  email! : string;
  password! : string;
  //email : string = 'eduardo.ramos.17v@gmail.com';
  //password : string = 'adm1234';

  constructor(
    private form: FormBuilder,
    private authService : AuthService,
    private tokenService : TokenService,
    private router : Router,
    private alertsService : AlertsService,
    private navbarService : NavbarService,
  ) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  private buildLoginForm():void {
    this.loginForm = this.form.group({
      email : [this.email, [Validators.required, Validators.email]],
      password : [this.password, [Validators.required, Validators.minLength(7)]],
    });
    this.loginForm.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      this.email = value.email;
      this.password = value.password;
    });
  }

  login():void {
    const userLogin = new UserLogin(this.email, this.password);
    this.authService.login(userLogin).subscribe(
      data => {
        this.tokenService.setToken(data.access_token);
        this.tokenService.setUserName(data.me.original.name+' '+data.me.original.lastname1);
        this.navbarService.setLogged(true);
        this.navbarService.setName(data.me.original.name+' '+data.me.original.lastname1);
        this.alertsService.success('¡Bien!', 'La sesión se creo correctamente');
        this.router.navigate(['/home']);
      },
      err => {
        this.alertsService.errors(err);
      }
    );
  }

}
