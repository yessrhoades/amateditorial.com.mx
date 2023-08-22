import { AfterViewInit, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Book } from 'src/app/models/Book';

@Component({
  selector: 'app-slider-book',
  templateUrl: './slider-book.component.html',
  styleUrls: ['./slider-book.component.scss']
})
export class SliderBookComponent implements OnInit {

  width: number = 0;
  elements: number = 0;
  col!: string;

  @Input () books: Book[] = [];
  @Input () id!: string;

  arr : any[] = [];
  arrActive : any[] = [];

  book!: Book;

  constructor() {
    this.calculateElements();
  }

  ngOnInit(): void {
    this.generatorItem();
  }

  calculateElements():void {
    this.width = document.body.clientWidth;
    if (this.width < 455) this.col = 'col-12', this.elements = 1;
    else if (this.width < 700) this.col = 'col-6', this.elements = 2;
    else if (this.width < 900) this.col = 'col-4', this.elements = 3;
    else if (this.width < 1200) this.col = 'col-3', this.elements = 4;
    else this.col = 'col-2', this.elements = 6;
  }

  generatorItem():void {
    //selecciona el primer item active
    for (let i = 0; i < this.elements; i++) {
      this.arrActive.push(this.books[i]);
    }
    //crea los items
    for (let i = this.elements; i < this.books.length; i += this.elements) {
      let arrTemp: any[] = [];
      for (let e = i; e < (i + this.elements); e++) {
        arrTemp.push(this.books[e]);
      }
      this.arr.push(arrTemp);
    }
    //elimina los undefined
    const last = this.arr.length - 1;
    for (let i = (this.elements - 1); i >= 0; i--) {
      if (this.arr[last][i] === undefined) {
        this.arr[last].splice(i, 1);
      }
    }
  }

}
