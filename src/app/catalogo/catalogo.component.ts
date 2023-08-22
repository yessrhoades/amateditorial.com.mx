import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../models/Book';
import { BooksService } from '../services/books.service';
import { debounceTime } from 'rxjs';
import { AlertsService } from '../services/alerts.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  searchForm!: FormGroup;
  search! : string;

  novelties: Book[] = [];
  amate: Book[] = [];
  independent: Book[] = [];
  outStanding: Book[] = [];
  searchAll: Book[] = [];

  protected categories_amate! : Category [];
  protected categories_independent! : Category [];

  constructor(
    private bookService : BooksService,
    private form: FormBuilder,
    private alertsService : AlertsService,
  ) { }

  ngOnInit(): void {
    this.loadBooks();
    this.buildSearchForm();
  }

  loadBooks():void {
    this.searchAll = [];
    this.bookService.getAll().subscribe(
      data => {
        this.novelties = data.novelties;
        this.amate = data.amate;
        this.independent = data.independent;
        this.outStanding = data.outStanding;

        this.categories_amate = data.categories_amate;
        this.categories_independent = data.categories_independent;
      },
      error => {
        this.alertsService.errors(error);
      }
    );
  }

  private buildSearchForm():void {
    this.searchForm = this.form.group({
      search : [this.search, []]
    });
    this.searchForm.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      this.search = value.search;
    });
  }

  protected searchGo():void {
    if (this.search == '') {
      this.loadBooks();
    } else {
      this.bookService.getSearch(this.search).subscribe(
        data => {
          this.searchAll = data.search;
          if (this.searchAll.length == 0) {
            this.alertsService.warning('¡Ups!', 'No se encontraron libros con la referencia '+this.search, '');
          } else {
            this.novelties = [];
            this.amate = [];
            this.independent = [];
            this.outStanding = [];
          }
        },
        error => {
          this.alertsService.errors(error);
        }
      );
    }
  }

  protected searchClassification(classification : string, name : string):void {
    if (classification == 'all') {
      this.loadBooks();
    } else {
      this.bookService.getSearchClassification(classification).subscribe(
        data => {
          this.searchAll = data.search;
          if (this.searchAll.length == 0) {
            this.alertsService.warning('¡Ups!', 'No se encontraron libros con la referencia '+name, '');
          } else {
            this.novelties = [];
            this.amate = [];
            this.independent = [];
            this.outStanding = [];
          }
        },
        error => {
          this.alertsService.errors(error);
        }
      );
    }
  }

  protected searchCategory(category : number, name : string):void {
    this.bookService.getSearchCategory(category).subscribe(
      data => {
        this.searchAll = data.search;
        if (this.searchAll.length == 0) {
          this.alertsService.warning('¡Ups!', 'No se encontraron libros con la referencia '+name, '');
        } else {
          this.novelties = [];
          this.amate = [];
          this.independent = [];
          this.outStanding = [];
        }
      },
      error => {
        this.alertsService.errors(error);
      }
    );
  }


}
