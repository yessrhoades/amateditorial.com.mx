import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
import { AuthService } from '../services/auth.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  email! : string;

  constructor(
    private form: FormBuilder,
    private authService : AuthService,
    private alertsService : AlertsService,
  ) { }

  ngOnInit(): void {
    this.buildForgotPasswordForm();
  }

  private buildForgotPasswordForm():void {
    this.forgotPasswordForm = this.form.group({
      email : [this.email, [Validators.required, Validators.email]]
    });
    this.forgotPasswordForm.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      this.email = value.email;
    });
  }

  forgotPassword():void {
    this.authService.forgotPassword(this.email).subscribe(
      data => {
        this.email = '';
        this.alertsService.success('¡Bien!', data.message);
      },
      err => {
        this.alertsService.errors(err);
      }
    );
  }

}
