import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { UserApi, CommonApi, ShopApi } from 'client';
import { MainLogoComponent, PageFooterComponent } from 'common';
import { Cookie } from 'services';

@Component({
  moduleId: module.id,
  selector: 'init-store',
  template: require('./initStore.html'),
  styles: [require('./initStore.scss')],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, MainLogoComponent, PageFooterComponent],
  providers: [HTTP_PROVIDERS, UserApi, CommonApi, ShopApi, Md5,Cookie]
})

export class InitStoreComponent {
  isForm: ControlGroup;
  constructor(private router: Router, fb: FormBuilder, params: RouteSegment, private uApi: UserApi, private cApi: CommonApi, private sApi: ShopApi) {
    // 表单验证
    this.isForm = fb.group({
      'name': ['']
    });
  }
  // 初始化
  ngOnInit() {

  }

  onResigerShop() {
    // payload: models.MyShopResponse
    let token = Cookie.load('token');
    console.log('token', token);
    this.sApi.defaultHeaders.set('token', token);
    this.sApi.defaultHeaders.set('content-type', 'application/json');
    this.sApi.shopRegisterPost(this.isForm.value).subscribe(data => {
      console.log(data);
    });
  }

  toHome() {
    this.router.navigate(['']);
  }
  goBack() {
    window.history.back();
  }
}
