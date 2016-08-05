import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {  ControlGroup, FormBuilder, Control } from '@angular/common';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';

import { UserApi, ShopApi, Shop, MyAcountResponse } from 'client';
import { Cookie } from 'services';

@Component({
  moduleId: module.id,
  selector: 'navbar',
  template: require('./navbar.html'),
  styles: [require('./navbar.scss')],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, UserApi, ShopApi, Cookie]
})

export class NavbarComponent {
  title: string;
  storeName: string;
  shopId: number;
  list: Array<Shop>;

  constructor(private router: Router, private uApi: UserApi, private sApi: ShopApi) {

  }

  ngOnInit() {
    this.getMe();
  }

  getMe() {
    this.uApi.userMeGet().subscribe((data: MyAcountResponse) => {
      this.shopId = data.data.user.lastShopId;
      this.getList();
    })
  }

  getList() {
    this.sApi.shopMyshopGet().subscribe((data) => {
      this.list = data.data;
      _.forEach(this.list, (val, i) => {
        if (this.shopId == val.id) {
          this.storeName = val.name;
        }
      })
    })
  }

  onChangeStore(item) {
    this.uApi.userShopCurrentPost(item.id).subscribe((data) => {
      this.storeName = item.name;
      Cookie.save('shopId', item.id);
      this.router.navigate(['/dashbroad/business-list']);
    });
  }

}
