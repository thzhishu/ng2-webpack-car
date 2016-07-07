import { Component, Input, Output } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
    moduleId:module.id,
    selector: 'register',
    template: require('./register.html'),
    styles: [ require('./register.scss') ],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
    providers: [HTTP_PROVIDERS],
})

export class RegisterComponent {
    constructor(private router: Router, params: RouteSegment) {

    }
    ngOnInit() {

    }

    toHome() {
        this.router.navigate(['']);
    }
    goBack() {
        window.history.back();
    }
}
