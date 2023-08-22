import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private URL : string = environment.baseUrl+'api/';

  constructor(
    private httpclient: HttpClient
  ) { }

  public index():Observable<any>{
    return this.httpclient.get(this.URL+"blogs");
  }

}
