import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  private URL : string = environment.baseUrl+'api/';

  constructor(
    private httpclient: HttpClient
  ) { }

  public store(email : string):Observable<any>{
    return this.httpclient.post(this.URL+"subscriber", {'email' : email});
  }
}
