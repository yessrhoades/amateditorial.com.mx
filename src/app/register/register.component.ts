import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
import { AuthService } from '../services/auth.service';
import { debounceTime } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  name! : string;
  lastname1! : string;
  lastname2! : string;
  email! : string;
  password! : string;
  confirm_password! : string;

  constructor(
    private form: FormBuilder,
    private authService : AuthService,
    private alertsService : AlertsService,
  ) { }

  ngOnInit(): void {
    this.buildRegisterForm();
  }

  private buildRegisterForm():void {
    this.registerForm = this.form.group({
      name : [this.name, [Validators.required]],
      lastname1 : [this.lastname1, [Validators.required]],
      lastname2 : [this.lastname2, [Validators.required]],
      email : [this.email, [Validators.required, Validators.email]],
      password : [this.password, [Validators.required]],
      confirm_password : [this.confirm_password, [Validators.required]],
    });
    this.registerForm.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      this.name = value.name;
      this.lastname1 = value.lastname1;
      this.lastname2 = value.lastname2;
      this.email = value.email;
      this.password = value.password;
      this.confirm_password = value.confirm_password;
    });
  }

  cleanRegisterForm():void {
    this.name = '';
    this.lastname1 = '';
    this.lastname2 = '';
    this.email = '';
    this.password = '';
    this.confirm_password = '';
  }

  register():void {
    if (this.password != this.confirm_password) {
      this.alertsService.error('¡Error!', 'Las contraseñas no coinciden');
      return;
    }
    let user = new User();
    user.name = this.name;
    user.lastname1 = this.lastname1;
    user.lastname2 = this.lastname2;
    user.email = this.email;
    user.password = this.password;

    this.authService.register(user).subscribe(
      data => {
        this.cleanRegisterForm();
        this.alertsService.success('¡Bien!', data.message);
      },
      error => {
        this.alertsService.errors(error);
      }
    );
  }

}
