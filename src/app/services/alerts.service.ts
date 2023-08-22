import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private router: Router,
  ) { }

  public errors(error: HttpErrorResponse):void {
    switch (error.status) {
      //case 401 : this.error('¡Error!', error.error.message);  break;
      case 403 : this.error('¡Error!', error.error.message);  break;
      case 404 : this.error('¡Error!', error.error.message);  break;
      case 422 :
        var points = JSON.parse(error.error);
        var points_array = Object.keys(points).map(
          function (clave) {
            var elemento = points[clave];
            elemento.id = clave;
            return elemento;
          }
        );
        this.warning('¡Ups!', points_array[0][0], points_array[0].id);
      break;
      case 500 : this.error('¡Error!', error.error.message); break;
    }
  }

  public warning(title:string, message:string, input:string):void {
    Swal.fire({
        icon: 'warning',
        title: title,
        text: message,
        //imageUrl: "assets/img/icons/ups.png",
        //imageWidth: 100,
        //imageHeight: 100,
        confirmButtonText: "Ok",
        confirmButtonColor: "#5e7d23",
        didClose: () => {
          const inputTag = document.getElementById(input) as HTMLInputElement;
          inputTag.focus();
        }
    });
  }

  public error(title:string, message:string):void {
    Swal.fire({
        icon: 'error',
        title: title,
        text: message,
        //imageUrl: "assets/img/icons/error.png",
        //imageWidth: 100,
        //imageHeight: 100,
        confirmButtonText: "Ok",
        confirmButtonColor: "#5e7d23"
    });
  }

  public error_reload(title:string, message:string) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: message,
        //imageUrl: "assets/img/icons/success.png",
        //imageWidth: 100,
        //imageHeight: 100,
        confirmButtonText: "Ok",
        confirmButtonColor: "#5e7d23",
        didClose: () => { location.reload(); }
    });
  }

  public success(title:string, message:string):void {
    Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        //imageUrl: "assets/img/icons/success.png",
        //imageWidth: 100,
        //imageHeight: 100,
        confirmButtonText: "Ok",
        confirmButtonColor: "#5e7d23"
    });
  }

  public success_reload(title:string, message:string) {
    Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        //imageUrl: "assets/img/icons/success.png",
        //imageWidth: 100,
        //imageHeight: 100,
        confirmButtonText: "Ok",
        confirmButtonColor: "#5e7d23",
        didClose: () => { location.reload(); }
    });
  }

  public success_reload_to(title : string, message : string, router : string) {
    Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        //imageUrl: "assets/img/icons/success.png",
        //imageWidth: 100,
        //imageHeight: 100,
        confirmButtonText: "Ok",
        confirmButtonColor: "#5e7d23",
        didClose: () => {
          this.router.navigate(['/'+router]);
        }
    });
  }

}
