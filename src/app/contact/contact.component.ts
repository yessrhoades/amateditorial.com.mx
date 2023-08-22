import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { debounceTime } from 'rxjs';
import { Contact } from '../models/contact';
import { AlertsService } from '../services/alerts.service';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  modalRef!: BsModalRef;

  contactForm!: FormGroup;
  name! : string;
  telephone! : string;
  city! : string;
  email! : string;
  company! : string;
  subject! : string;
  message! : string;

  suggestionForm!: FormGroup;
  suggestion_name! : string;
  suggestion_email! : string;
  suggestion_subject! : string;
  suggestion_message! : string;

  constructor(
    private form: FormBuilder,
    private contactService : ContactService,
    private alertService : AlertsService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.buildContactForm();
    this.buildSuggestionForm();
  }

  private buildContactForm():void {
    this.contactForm = this.form.group({
      name : [this.name, [Validators.required]],
      telephone : [this.telephone, []],
      city : [this.city, []],
      email : [this.email, [Validators.required, Validators.email]],
      company : [this.company, []],
      subject : [this.subject, [Validators.required, Validators.maxLength(50)]],
      message : [this.message, [Validators.required]],
    });
    this.contactForm.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      this.name = value.name;
      this.telephone = value.telephone;
      this.city = value.city;
      this.email = value.email;
      this.company = value.company;
      this.subject = value.subject;
      this.message = value.message;
    });
  }

  cleanContactForm():void {
    this.name = '';
    this.telephone = '';
    this.city = '';
    this.email = '';
    this.company = '';
    this.subject = '';
    this.message = '';
  }

  contact_send():void {
    const contact = new Contact();
    contact.name = this.name;
    contact.telephone = this.telephone;
    contact.city = this.city;
    contact.email = this.email;
    contact.company = this.company;
    contact.subject = this.subject;
    contact.message = this.message;
    this.contactService.contact_send(contact).subscribe(
      data => {
        this.cleanContactForm();
        this.alertService.success('¡Bien!', data.message);
      },
      error => {
        this.alertService.errors(error);
      }
    );
  }


  private buildSuggestionForm():void {
    this.suggestionForm = this.form.group({
      suggestion_name : [this.suggestion_name, [Validators.required]],
      suggestion_email : [this.suggestion_email, [Validators.required, Validators.email]],
      suggestion_subject : [this.suggestion_subject, [Validators.required, Validators.maxLength(50)]],
      suggestion_message : [this.suggestion_message, [Validators.required]],
    });
    this.suggestionForm.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      this.suggestion_name = value.suggestion_name;
      this.suggestion_email = value.suggestion_email;
      this.suggestion_subject = value.suggestion_subject;
      this.suggestion_message = value.suggestion_message;
    });
  }

  cleanSuggestionForm():void {
    this.suggestion_name = '';
    this.suggestion_email = '';
    this.suggestion_subject = '';
    this.suggestion_message = '';
  }

  suggestion_send():void {
    const contact = new Contact();
    contact.name = this.suggestion_name;
    contact.email = this.suggestion_email;
    contact.subject = this.suggestion_subject;
    contact.message = this.suggestion_message;

    this.contactService.suggestions_send(contact).subscribe(
      data => {
        this.cleanSuggestionForm();
        this.alertService.success('¡Bien!', data.message);
      },
      error => {
        this.alertService.errors(error);
      }
    );
  }

  newSuggestion(template: TemplateRef<any>) {
    this.cleanSuggestionForm();
    this.modalRef = this.modalService.show(template);
  }

}
