import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { catchError, concatMap, finalize, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { JWT } from '../models/jwt';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject(null);

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private alertService : AlertsService
  ){ }

  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("entrando al interceptor...");

    if (!this.tokenService.isLogged()) {
      return next.handle(request);
    }

    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+this.tokenService.getToken()
    });

    let reqClone = request.clone({headers});

    //return next.handle(reqClone);

    return next.handle(reqClone).pipe(
      catchError(
        (err: HttpErrorResponse) => {
          if (err.status != 401) {
            return next.handle(reqClone);
          } else {
            this.authService.logout();
            window.sessionStorage.clear();
            this.router.navigate(["/login"]);
            this.alertService.error_reload('¡Ups!', err.error.message);
            return throwError(err);
          }
        }
      )
    );

  }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}];
