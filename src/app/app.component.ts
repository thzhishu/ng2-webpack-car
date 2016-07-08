import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, Routes } from '@angular/router';

// import { HomeComponent } from './common';
import { LoginMinComponent,RegisterComponent } from './components';
import * as moment from 'moment';

// import '../../../node_modules/spinkit/scss/spinners/9-cube-grid.scss';


@Component({
    selector: 'car-app',
    template: '<router-outlet></router-outlet>',
    styles: [require('../assets/css/app.scss')],
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS],
    encapsulation: ViewEncapsulation.Native
})

@Routes([
    { path: '/login-min', component: LoginMinComponent },
    { path: '/register', component: RegisterComponent },
])

export class AppComponent implements OnInit {
    constructor(private router: Router) {

    }
    ngOnInit() {
        moment.locale('zh-cn');
        // this.router.navigate(['/']);
    }
}
