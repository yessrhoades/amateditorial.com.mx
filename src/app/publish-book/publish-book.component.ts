import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
import { ContactService } from '../services/contact.service';
import { debounceTime } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Post } from '../models/Post';

@Component({
  selector: 'app-publish-book',
  templateUrl: './publish-book.component.html',
  styleUrls: ['./publish-book.component.scss']
})
export class PublishBookComponent implements OnInit {

  publishForm!: FormGroup;
  name! : string;
  telephone! : string;
  email! : string;
  address! : string;
  work! : string;
  literary_genre! : string;
  number_books : number = 0;
  number_words : number = 0;
  number_pages : number = 0;
  message! : string;

  selectedFile?: FileList;
  currentFile?: File;
  progress = 0;

  constructor(
    private form: FormBuilder,
    private contactService : ContactService,
    private alertService : AlertsService,
  ) { }

  ngOnInit(): void {
    this.buildPublishForm();
  }

  private buildPublishForm():void {
    this.publishForm = this.form.group({
      name : [this.name, [Validators.required]],
      telephone : [this.telephone, [Validators.required]],
      email : [this.email, [Validators.required, Validators.email]],
      address : [this.address, [Validators.required]],
      work : [this.work, [Validators.required]],
      literary_genre : [this.literary_genre, [Validators.required]],
      number_books : [this.number_books, [Validators.required, Validators.min(1)]],
      number_words : [this.number_words, [Validators.required, Validators.min(1)]],
      number_pages : [this.number_pages, [Validators.required, Validators.min(1)]],
      message : [this.message, [Validators.required]],
    });
    this.publishForm.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      this.name = value.name;
      this.telephone = value.telephone;
      this.email = value.email;
      this.address = value.address;
      this.work = value.work;
      this.literary_genre = value.literary_genre;
      this.number_books = value.number_books;
      this.number_words = value.number_words;
      this.number_pages = value.number_pages;
      this.message = value.message;
    });
  }

  cleanPublishForm():void {
    this.name = '';
    this.telephone = '';
    this.email = '';
    this.address = '';
    this.work = '';
    this.literary_genre = '';
    this.number_books = 0;
    this.number_words = 0;
    this.number_pages = 0;
    this.message = '';
  }

  selectFile(event: any):void {
    this.selectedFile = event.target.files;
  }

  post() {
    const post = new Post();
    post.name = this.name;
    post.telephone = this.telephone;
    post.email = this.email;
    post.address = this.address;
    post.work = this.work;
    post.literary_genre = this.literary_genre;
    post.number_books = this.number_books;
    post.number_words = this.number_words;
    post.number_pages = this.number_pages;
    post.message = this.message;

    if (this.selectedFile) {
      const file: File | null = this.selectedFile.item(0);
      if (file) {
        this.currentFile = file;
        post.file = this.currentFile;
      }
    }

    this.contactService.post(post).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.progress = 0;
          this.selectedFile = undefined;
          this.currentFile = undefined;
          this.cleanPublishForm();
          this.alertService.success('¡Bien!', event.body.message);
        }
      },
      error: (err: any) => {
        this.progress = 0;
        if (err.error && err.error.message) {
          this.alertService.errors(err);
        } else {
          this.alertService.error('¡Error!', 'Could not upload the file!');
        }
        this.selectedFile = undefined;
        this.currentFile = undefined;
      }
    });
  }

}
