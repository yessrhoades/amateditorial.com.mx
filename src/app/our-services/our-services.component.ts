import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent implements OnInit {

  constructor(
    private rutaActiva: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const section = this.rutaActiva.snapshot.params['section'];
    console.log(section);
    if (section != 'all') {
      this.scrollToElements(section);
    }
  }

  protected scrollToElements(section : string):void {
    const inputTag = document.getElementById(section) as HTMLInputElement;
    inputTag.scrollIntoView({block:'start'});
  }
}
