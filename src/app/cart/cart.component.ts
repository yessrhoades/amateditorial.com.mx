import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Book } from '../models/Book';
import { AlertsService } from '../services/alerts.service';
import { BooksService } from '../services/books.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  books : Book[] = [];

  total : number = 0;

  envio : number = 0;

  baseUrl : string = environment.baseUrl;
  baseStorageUrl : string = environment.storageUrl;

  constructor(
    private cartService : CartService,
    private bookService : BooksService,
    private alertService : AlertsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.books = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  private chanceQuantity(id : number, value:number):void {
    this.bookService.getById(id).subscribe(
      book => {
        book.quantity = value;
        this.cartService.addCart(book);
        this.books = this.cartService.getCart();
        this.total = this.cartService.getTotal();
      },
      error => {
        this.alertService.errors(error);
      }
    );
  }

  protected mas(id : number):void {
    this.chanceQuantity(id, 1);
  }

  protected menos(id : number):void {
    this.chanceQuantity(id, -1);
  }

  protected inputQuantity(id : number, event: any):void {
    const value = event.target.value;
    if (value == '') return;
    const parseValue = parseInt(value);
    if (parseValue >= 1) {
      let books = this.cartService.getCart();
      for(let i = 0; i < books.length; i++) {
        if (id == books[i].id) {//si existe...
          books[i].quantity = parseValue;
          this.cartService.setCart(this.cartService.getStringify(books));
          this.books = this.cartService.getCart();
          this.total = this.cartService.getTotal();
        }
      }
    } else {
      this.alertService.error('¡Error!', 'La cantidad en los productos no puede ser menor a 1');
      this.books = this.cartService.getCart();
      this.total = this.cartService.getTotal();
    }
  }

  protected deleteProduct(index : number):void {
    this.cartService.deleteProduct(index);
    this.books = this.cartService.getCart();
    this.total = this.cartService.getTotal();
    this.cartService.innerCountCart();
    if (this.books.length == 0) {
      this.router.navigate(['/home']);
    }
  }


}
