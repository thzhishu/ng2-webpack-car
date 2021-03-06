import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES, provideRouter, Router, RouterConfig } from '@angular/router';

import * as moment from 'moment';


@Component({
  selector: 'car-app',
  template: `<router-outlet></router-outlet>`,
  styles: [require('assets/css/app.scss')],
  directives: [ROUTER_DIRECTIVES],
  encapsulation: ViewEncapsulation.None
})

// @Routes([
//   // {path: '/oauth',component: components.OauthComponent},
//   { path: '/login-min', component: components.LoginMinComponent },
//   { path: '/register', component: components.RegisterComponent },
//   { path: '/forget-pwd', component: components.ForgetPwdComponent },
//   { path: '/init-store', component: components.InitStoreComponent },
//   { path: '/my-account', component: components.MyAccountComponent },
//   { path: '/modify-store', component: components.ModifyStoreComponent },
//   { path: '/store-add', component: components.StoreAddComponent },
//   { path: '/modify-pwd', component: components.ModifyPwdComponent },
//   { path: '/employee-add', component: components.EmployeeAddComponent },
//   { path: '/employee-edit', component: components.EmployeeEditComponent },
//   { path: '/employee-list', component: components.EmployeeListComponent },
//   { path: '/customer-add', component: components.CustomerAddComponent },
//   { path: '/customer-edit', component: components.CustomerEditComponent },
//   { path: '/customer-detail', component: components.CustomerDetailComponent },
//   { path: '/customer-list', component: components.CustomerListComponent },
//   { path: '/report/week/business', component: components.ReportWeekBusinessComponent },
//   { path: '/report/week/satisfaction', component: components.ReportWeekSatisfactionComponent },
//   { path: '/business-add', component: components.BusinessAddComponent },
//   { path: '/business-list', component: components.BusinessListComponent },
//   { path: '/survey-pc', component: components.SurveyPcComponent }
// ])

export class AppComponent implements OnInit {
  constructor(private router: Router) {

  }
  ngOnInit() {
    moment.locale('zh-cn');
  }
}
