import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, Routes } from '@angular/router';

import * as components from 'components';
import * as moment from 'moment';

// import '../../../node_modules/spinkit/scss/spinners/9-cube-grid.scss';



@Component({
    selector: 'car-app',
    template: '<router-outlet></router-outlet>',
    styles: [require('assets/css/app.scss')],
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS],
    encapsulation: ViewEncapsulation.Native
})

@Routes([
    { path: '/login-min', component: components.LoginMinComponent },
    { path: '/register', component: components.RegisterComponent },
    { path: '/forget-pwd', component: components.ForgetPwdComponent },
    { path: '/init-store', component: components.InitStoreComponent },
    { path: '/my-account', component: components.MyAccountComponent },
    { path: '/modify-store', component: components.ModifyStoreComponent },
    { path: '/modify-pwd', component: components.ModifyPwdComponent },
    { path: '/employee-add', component: components.EmployeeAddComponent },
    { path: '/employee-edit', component: components.EmployeeEditComponent },
    { path: '/employee-list', component: components.EmployeeListComponent },
    { path: '/customer-add', component: components.CustomerAddComponent },
    { path: '/customer-edit', component: components.CustomerEditComponent },
    { path: '/customer-detail', component: components.CustomerDetailComponent },
    { path: '/customer-list', component: components.CustomerListComponent },
    { path: '/report/week/business', component: components.ReportWeekBusinessComponent },
    { path: '/report/week/satisfaction', component: components.ReportWeekSatisfactionComponent }
])

export class AppComponent implements OnInit {
    constructor(private router: Router) {

    }
    ngOnInit() {
        moment.locale('zh-cn');
        // this.router.navigate(['/']);
    }
}
