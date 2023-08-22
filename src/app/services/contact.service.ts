import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private URL : string = environment.baseUrl+'api/';

  constructor(
    private httpclient: HttpClient
  ) { }

  public contact_send(contact : Contact):Observable<any>{
    return this.httpclient.post(this.URL+"contact", contact);
  }

  public suggestions_send(contact : Contact):Observable<any>{
    return this.httpclient.post(this.URL+"complaints_suggestions", contact);
  }

  public post(post : Post):Observable<HttpEvent<any>> {

    let formData: FormData = new FormData();
    formData.append('name', post.name);
    formData.append('telephone', post.telephone);
    formData.append('email', post.email);
    formData.append('address', post.address);
    formData.append('work', post.work);
    formData.append('literary_genre', post.literary_genre);
    formData.append('number_books', post.number_books+'');
    formData.append('number_words', post.number_words+'');
    formData.append('number_pages', post.number_pages+'');
    formData.append('message', post.message);
    if (post.file != undefined) formData.append('file', post.file);

    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');

    const req = new HttpRequest('POST', this.URL+'post', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpclient.request(req);
  }
}
