import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { UserApi, CommonApi } from 'client';
import { Cookie } from 'services';

@Component({
	moduleId: module.id,
	selector: 'menus',
	template: require('./menus.html'),
	styles: [require('./menus.scss')],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
	providers: [HTTP_PROVIDERS, UserApi, CommonApi, Md5 ]
})

export class MenusComponent {
	constructor(private router: Router,private params: RouteSegment) {

	}

	onExit(){
		Cookie.remove('token');
		Cookie.remove('shopId');
		this.router.navigate(['/login-min']);
	}
}
