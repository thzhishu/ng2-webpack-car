import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control, NgControlGroup } from '@angular/common';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';

// import { } from 'client';
import { MainLogoComponent, PageFooterComponent } from 'common';

@Component({
  moduleId: module.id,
  selector: 'business-add',
  template: require('./businessAdd.html'),
  styles: [require('./businessAdd.scss')],
  // directives: [MainLogoComponent, PageFooterComponent],
  providers: [HTTP_PROVIDERS, Md5]
})

export class BusinessAddComponent {
  constructor(private router: Router, private fb: FormBuilder, private params: RouteSegment) {

  }
  // 初始化
  ngOnInit() {

  }
  onClose(){

  }
}
