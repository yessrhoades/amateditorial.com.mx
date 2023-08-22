import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private URL : string = environment.baseUrl+'api/';

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getNovelties():Observable<any> {
    return this.httpClient.get<Book>(this.URL+'products/get/novelties');
  }

  public getAll():Observable<any> {
    return this.httpClient.get<Book>(this.URL+'products/get/all');
  }

  public getSearch(search : string):Observable<any> {
    return this.httpClient.get<Book>(this.URL+'products/get/search/'+search);
  }

  public getSearchClassification(search : string):Observable<any> {
    return this.httpClient.get<Book>(this.URL+'products/get/search/classification/'+search);
  }

  public getSearchCategory(category : number):Observable<any> {
    return this.httpClient.get<Book>(this.URL+'products/get/search/category/'+category);
  }

  public getById(id:number):Observable<any> {
    return this.httpClient.get<Book>(this.URL+'products/'+id);
  }

}
