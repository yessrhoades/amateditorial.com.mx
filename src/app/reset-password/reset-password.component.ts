import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { AuthService } from '../services/auth.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;

  email! : string;
  token! : string;

  password! : string;
  confirm_password! : string;

  constructor(
    private form: FormBuilder,
    private rutaActiva: ActivatedRoute,
    private authService : AuthService,
    private alertsService : AlertsService,
  ) { }

  ngOnInit(): void {
    this.email = this.rutaActiva.snapshot.params['email'];
    this.token = this.rutaActiva.snapshot.params['token'];
    this.buildResetPasswordForm();
  }

  private buildResetPasswordForm():void {
    this.resetPasswordForm = this.form.group({
      password : [this.password, [Validators.required]],
      confirm_password : [this.confirm_password, [Validators.required]]
    });
    this.resetPasswordForm.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      this.password = value.password;
      this.confirm_password = value.confirm_password;
    });
  }

  resetPassword():void {
    if (this.password != this.confirm_password) {
      this.alertsService.error('¡Error!', 'Las contraseñas no coinciden');
      return;
    }
    this.authService.resetPassword(this.email, this.token, this.password).subscribe(
      data => {
        this.password = '';
        this.confirm_password = '';
        this.alertsService.success_reload_to('¡Bien!', data.message, 'login');
      },
      err => {
        this.alertsService.errors(err);
      }
    );
  }

}
