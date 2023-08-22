import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {

  constructor(
    private rutaActiva: ActivatedRoute,
    private authService : AuthService,
    private alertsService : AlertsService,
  ) { }

  ngOnInit(): void {
    const email = this.rutaActiva.snapshot.params['email'];
    const token = this.rutaActiva.snapshot.params['token'];
    this.confirm(email, token);
  }

  private confirm(email : string, token : string):void {
    this.authService.confirm(email, token).subscribe(
      data => {
        this.alertsService.success_reload_to('¡Bien!', data.message, 'login');
      },
      error => {
        this.alertsService.errors(error);
      }
    );
  }

}
