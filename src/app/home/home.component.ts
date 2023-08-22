import { Component, OnInit } from '@angular/core';
import { VERSION } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Book } from '../models/Book';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false, showIndicators: true } }
  ],
})
export class HomeComponent implements OnInit {

  slides = [
    {image: 'assets/images/slide1.png', text: 'First'},
    {image: 'assets/images/slide1.png', text: 'First'},
    {image: 'assets/images/slide1.png', text: 'First'},
  ];
  noWrapSlides = false;
  showIndicator = true;

  books: Book[] = [];

  constructor(
    private bookService : BooksService,
  ) { }

  ngOnInit(): void {
    //console.log(VERSION.full);
    this.loadNovelties();
  }

  loadNovelties():void {
    this.bookService.getNovelties().subscribe(
      data => {
        this.books = data;
      },
      error => {

      }
    );
  }

}
