import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Book } from 'src/app/models/Book';
import { AlertsService } from 'src/app/services/alerts.service';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-book',
  templateUrl: './modal-book.component.html',
  styleUrls: ['./modal-book.component.scss']
})
export class ModalBookComponent implements OnInit {

  book! : Book;

  baseUrl : string = environment.baseUrl;
  baseStorageUrl : string = environment.storageUrl;

  quantity : number = 1;

  constructor(
    public bsModalRef: BsModalRef,
    private bookService : BooksService,
    private cartService : CartService,
    private alertService : AlertsService,
    private rutaActiva: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getBook(this.rutaActiva.snapshot.params['id']);
  }

  getBook(id : number):void {
    this.bookService.getById(id).subscribe(
      data => {
        this.book = data;
      },
      error => {
        this.alertService.errors(error);
      }
    );
  }


  private chanceQuantity(value:number):void {
    if (this.quantity == 1 && value == -1) return;
    else this.quantity += value;
  }

  mas():void {
    this.chanceQuantity(1);
  }

  menos():void {
    this.chanceQuantity(-1);
  }

  inputQuantity(event: any):void {
    const value = event.target.value;
    if (parseInt(value) >= 1) this.quantity = parseInt(value);
    else this.quantity = 0;
  }

  addCard(id:number) {
    if (this.quantity == 0) {
      this.alertService.error('¡Error!', 'Asigne una cantidad mayor a 0');
      return;
    }
    this.bookService.getById(id).subscribe(
      book => {
        book.quantity = this.quantity;
        this.cartService.addCart(book);
        this.alertService.success('¡Bien!', 'El libro se agregó correctamente');
        this.close();
      },
      error => {
        this.alertService.errors(error);
      }
    );
  }

  close():void {
    this.bsModalRef.hide();
  }


}
