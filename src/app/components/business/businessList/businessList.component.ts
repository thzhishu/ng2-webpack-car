import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control, NgControlGroup } from '@angular/common';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { BusinessApi,BusinessList } from 'client';
import { MainLogoComponent, PageFooterComponent, NavbarComponent, MenusComponent, SearchBarComponent,PaginationComponent } from 'common';
import { BusinessAddComponent } from '../businessAdd/businessAdd.component.ts';
import { NgModel } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'business-list',
  template: require('./businessList.html'),
  styles: [require('./businessList.scss')],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NgModel, DATEPICKER_DIRECTIVES, NavbarComponent, MenusComponent, SearchBarComponent, PageFooterComponent,BusinessAddComponent,PaginationComponent],
  providers: [HTTP_PROVIDERS, BusinessApi],
  host: {
      '(click)': 'closeDatePicker($event)'
  }
})

export class BusinessListComponent {
  list:BusinessList;
  date:string;
  page:any = {current:1,limit:20,total:0};
  dateShow:boolean;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute,private bApi: BusinessApi) {
    this.date = moment().format('YYYY-MM-DD');
  }
  // 初始化
  ngOnInit() {
    this.getList();
  }

  // 日历插件还有问题
  onShowDate(event) {
      //event.stopPropagation();
      //this.dateShow = !this.dateShow;
  }

  public closeDatePicker(event) {
      event.stopPropagation();
      this.dateShow = false;
  }

  moment(date){
    return moment(date).format('YYYY-MM-DD');
  }

  onLastDate(){
    this.date = moment(this.date).subtract(1, 'days').format('YYYY-MM-DD');
    this.getList();
  }

  onNextDate(){
    this.date = moment(this.date).add(1, 'days').format('YYYY-MM-DD');
    this.getList();
  }

  get(ba){
    console.log('get',ba);
  }

  onOpen(){
    console.log('onOpen');
  }

  onClose(){
    this.getList();
  }

  changePage(event){
    this.page.current = event;
    this.getList();
  }

  getList(){
    this.bApi.businessListGet(this.date,this.page.current).subscribe(data => {
      if (data.meta.code === 200) {
        this.list = data.data;
        this.page.current = data.meta.current;
        this.page.limit = data.meta.limit;
        this.page.total = data.meta.total||150;
      }
    })
  }
}
