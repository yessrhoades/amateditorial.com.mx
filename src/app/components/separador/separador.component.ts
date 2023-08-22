import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-separador',
  template: '<div class="row m-0"><div class="col-2"></div><div class="col-8"><img src="assets/images/separador.png" alt="falta" class="w-full"></div><div class="col-2"></div></div>',
})
export class SeparadorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
