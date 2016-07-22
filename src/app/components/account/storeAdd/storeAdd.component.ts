import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control, Validators  } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { UserApi, CommonApi } from 'client';
import { MainLogoComponent, PageFooterComponent, NavbarComponent, MenusComponent, SearchBarComponent } from 'common';

@Component({
	moduleId: module.id,
	selector: 'store-add',
	template: require('./storeAdd.html'),
	styles: [require('./storeAdd.scss')],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NavbarComponent, MenusComponent, SearchBarComponent, PageFooterComponent],
	providers: [HTTP_PROVIDERS, UserApi, CommonApi, Md5 ]
})

export class StoreAddComponent {
	storeForm: ControlGroup;
	constructor(router: Router, fb: FormBuilder, params: RouteSegment, uApi: UserApi) {
		this.storeForm = fb.group({
			'name': ['', Validators.required],
			'provinceId': [0],
			'cityId': [0],
			'districtId': [0],
			'address': ['', Validators.required],
			'serviceIds': ['', Validators.required],
			'ownerName': [''],
			'phone': [''],
			'openingDate': [''],
			'station': [0],
			'area': [null]
		});
		console.dir(this.storeForm);
	}

	ngOnInit() {

	}



}
