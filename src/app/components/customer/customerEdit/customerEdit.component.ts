import { Component, Input, Output, NgZone, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { UserApi, CommonApi, CustomerApi, Customer } from 'client';
import { MainLogoComponent, PageFooterComponent, NavbarComponent, MenusComponent } from 'common';
import { CustomerFormComponent } from '../customerForm/customerForm.component';

@Component({
	moduleId: module.id,
	selector: 'customer-eidt',
	template: require('./customerEdit.html'),
	styles: [require('./customerEdit.scss')],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NavbarComponent, MenusComponent, CustomerFormComponent],
	providers: [HTTP_PROVIDERS, UserApi, CommonApi, Md5, CustomerApi ]
})

export class CustomerEditComponent {
	customerFields: any;
	@ViewChild(CustomerFormComponent) cf: CustomerFormComponent;
	constructor(private router: Router, fb: FormBuilder, private params: RouteSegment,  private cApi: CustomerApi) {
		console.log(params);
		this.customerId = params.getParam('id');
	}

	ngOnInit() {
		this.getCustomerById(this.customerId);
	}

	getCustomerById(id) {
		this.cApi.customerCustomerIdGet(id).subscribe(data => {
			console.log(data);
			if(data.data) {
				this.customerFields = data.data;
				console.log('c-f', this.customerFields)
				setTimeout(() => this.cf.initFb(), 0);
			}
		}, err => console.error(err));
	}
	

	
}