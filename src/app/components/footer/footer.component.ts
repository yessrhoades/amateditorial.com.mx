import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';
import { SubscriberService } from 'src/app/services/subscriber.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  subscriberForm!: FormGroup;

  email! : string;

  constructor(
    private form: FormBuilder,
    private subscriberService : SubscriberService,
    private alertService : AlertsService,
  ) { }

  ngOnInit(): void {
    this.buildSubscriberForm();
  }

  private buildSubscriberForm():void {
    this.subscriberForm = this.form.group({
      email: [this.email, [Validators.required, Validators.email]]
    });
    this.subscriberForm.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      this.email = value.email;
    });
  }

  successForm():void {
    this.subscriberService.store(this.email).subscribe(
      data => {
        this.email = '';
        this.alertService.success('¡Bien!', data.message);
      },
      error => {
        this.alertService.errors(error);
      }
    );
  }

}
