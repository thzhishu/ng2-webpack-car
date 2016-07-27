import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { FORM_DIRECTIVES } from '@angular/common';
import {MdCheckbox} from '@angular2-material/checkbox/checkbox';

import { MainLogoComponent, PageFooterComponent } from 'common';

@Component({
  moduleId: module.id,
  selector: 'init-store',
  template: require('./initStore.html'),
  styles: [require('./initStore.scss')],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, MainLogoComponent, PageFooterComponent],
  providers: []
})

export class InitStoreComponent {

  constructor(private router: Router) {

  }
  // 初始化
  ngOnInit() {

  }

  onSuccess(data){
    console.log(data);
  }

  toHome() {
    this.router.navigate(['']);
  }
  goBack() {
    window.history.back();
  }
}
