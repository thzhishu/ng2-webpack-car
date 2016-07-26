import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control, NgControlGroup } from '@angular/common';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { BusinessApi,BusinessList } from 'client';
import { MainLogoComponent, PageFooterComponent, NavbarComponent, MenusComponent, SearchBarComponent } from 'common';
import { BusinessAddComponent } from '../businessAdd/businessAdd.component.ts';

@Component({
  moduleId: module.id,
  selector: 'business-list',
  template: require('./businessList.html'),
  styles: [require('./businessList.scss')],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES,DATEPICKER_DIRECTIVES, NavbarComponent, MenusComponent, SearchBarComponent, PageFooterComponent,BusinessAddComponent],
  providers: [HTTP_PROVIDERS, BusinessApi]
})

export class BusinessListComponent {
  list:BusinessList;
  date:string;
  page:any = {current:1,limit:20,total:0};

  constructor(private router: Router, private fb: FormBuilder, private params: RouteSegment,private bApi: BusinessApi) {
    this.date = moment().format('YYYY-MM-DD');
  }
  // 初始化
  ngOnInit() {
    this.getList();
  }

  onLastDate(){
    this.date = moment(this.date).subtract(1, 'days').format('YYYY-MM-DD');
    this.getList();
  }

  onNextDate(){
    this.date = moment(this.date).add(1, 'days').format('YYYY-MM-DD');
    this.getList();
  }

  onOpen(){
    console.log('open');
  }

  onClose(){
    this.getList();
  }

  getList(){
    this.bApi.businessListGet(this.date).subscribe(data => {
      if (data.meta.code === 200) {
        this.list = data.data;
        this.page.current = data.meta.current;
        this.page.limit = data.meta.limit;
        this.page.total = data.meta.total;
      }
    })
  }
}
