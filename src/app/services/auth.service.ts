import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JWT } from '../models/jwt';
import { Observable, Subject } from 'rxjs';
import { TokenService } from './token.service';
import { UserLogin } from '../models/user-login';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = environment.baseUrl+"api/auth/";

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
  ) {

  }

  public login(user: UserLogin): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'login', user);
  }

  public register(user: User): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'register', user);
  }

  public confirm(email : string, token : string): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'confirm', {'email' : email, 'token' : token});
  }

  public forgotPassword(email : string): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'forgot_password', {'email' : email});
  }

  public resetPassword(email : string, token : string, password : string): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'reset_password', {
      'email' : email,
      'token' : token,
      'password' : password
    });
  }

  public refresh(jwt: JWT): Observable<JWT> {
    return this.httpClient.post<JWT>(this.authURL + 'refresh', jwt);
  }

  public logout(): Observable<any> {
    /*const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+this.tokenService.getToken()
    });*/

    //esto no funciona :(
    /*const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.tokenService.getToken());*/
    //{headers}
    return this.httpClient.post<any>(this.authURL + 'logout',null);
  }

}
