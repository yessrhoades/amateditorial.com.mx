import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Book } from 'src/app/models/Book';
import { AlertsService } from 'src/app/services/alerts.service';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import { ModalBookComponent } from '../modal-book/modal-book.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  bsModalRef!: BsModalRef;

  baseUrl : string = environment.baseUrl;
  baseStorageUrl : string = environment.storageUrl;

  @Input () book! : Book;

  constructor(
    private modalService: BsModalService,
    private bookService : BooksService,
    private cartService : CartService,
    private alertService : AlertsService,
    private router : Router,
  ) { }

  ngOnInit(): void {
  }

  addCard(id:number) {
    this.bookService.getById(id).subscribe(
      book => {
        book.quantity = 1;
        this.cartService.addCart(book);
        this.alertService.success('¡Bien!', 'El libro se agregó correctamente');
      },
      error => {
        this.alertService.errors(error);
      }
    );
  }

  show(id:number) {
    this.router.navigate(['/book/'+id]);
    /*this.bookService.getById(id).subscribe(
      data => {
        const initialState = {
          book : data
        };
        const options: ModalOptions = { class: 'modal-lg', initialState };
        this.bsModalRef = this.modalService.show(ModalBookComponent, options);
        this.bsModalRef.content.closeBtnName = 'Close';
      },
      error => {
        this.alertService.errors(error);
      }
    );*/
  }

}
