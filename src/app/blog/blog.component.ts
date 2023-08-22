import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Blog } from '../models/Blog';
import { AlertsService } from '../services/alerts.service';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  protected blogs : Blog[] = [];

  protected baseUrl : string = environment.baseUrl;
  baseStorageUrl : string = environment.storageUrl;

  constructor(
    private alertService : AlertsService,
    private blogService : BlogService,
  ) { }

  ngOnInit(): void {
    this.blogService.index().subscribe(
      data => {
        this.blogs = data.blogs;
      },
      error => {
        this.alertService.errors(error);
      }
    );
  }

}
