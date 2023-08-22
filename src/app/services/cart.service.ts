import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private alertService : AlertsService
  ) { }

  public getCart():Book[] {
    if(!localStorage.getItem('cart-amate')) this.setCart("[]");
    let books : Book[] = [];
    return books = JSON.parse(localStorage.getItem('cart-amate')!);
  }

  public innerCountCart():void {
    const inputTag = document.getElementById('count-cart') as HTMLInputElement;
    inputTag.innerHTML = this.getCart().length.toString();
  }

  public addCart(book : Book):void {
    let books = this.getCart(), i = 0;
    const count = books.length;
    if (count > 0) {
      //recorre el array para validar si existe sumarle la cantidad
      for(i; i < count; i++) {
        if (book.id == books[i].id) {//si existe...
          books[i].quantity += book.quantity;
          if (books[i].quantity >= 1) {
            this.setCart(this.getStringify(books));
            return;
          } else {
            this.alertService.error('¡Error!', 'La cantidad en los productos no puede ser menor a 1');
            return;
          }
        }
      }
    }

    books.push(book);
    this.setCart(this.getStringify(books));

    this.innerCountCart();
  }

  public cleanCart():void {
    let books = this.getCart();
    books.length = 0;
    this.setCart(this.getStringify(books));
  }

  public setCart(booksString : string):void {
    window.localStorage.setItem("cart-amate", booksString);
  }

  public deleteProduct(index : number):void {
    let books = this.getCart();
    books.splice(index, 1);
    this.setCart(this.getStringify(books));
  }

  public getStringify(string : any):string {
    return JSON.stringify(string);
  }

  public getTotal():number {
    let total : number = 0;
    const books = this.getCart();
    for (let book of books) {
      total += book.price * book.quantity;
    }
    return total;
  }


}
