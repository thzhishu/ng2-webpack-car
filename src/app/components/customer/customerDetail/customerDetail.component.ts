import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { CustomerApi, Customer, BusinessDetail } from 'client';
import { MainLogoComponent, PageFooterComponent, NavbarComponent, MenusComponent } from 'common';

@Component({
	moduleId: module.id,
	selector: 'customer-detail',
	template: require('./customerDetail.html'),
	styles: [require('./customerDetail.scss')],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NavbarComponent, MenusComponent],
	providers: [HTTP_PROVIDERS, CustomerApi ]
})

export class CustomerDetailComponent {
	customerId: number;
	customerDetail: any;
	customer: any;
	histories: BusinessHistoryDetail;
	constructor(private params: RouteSegment, private cApi: CustomerApi) {
		this.customerId = params.getParam('id');
	}

	ngOnInit() {
		this.getCustomerById(this.customerId);
	}
	getCustomerById(id) {
		this.cApi.customerHistoryCustomerIdGet(id).subscribe(data => {
			if (data.data) {
				this.customerDetail = data.data;
				// this.customer = this.customerDetail.customers.length ? this.customerDetail.customers[0] || [];
				this.customer = this.customerDetail.customers && this.customerDetail.customers.length ? this.customerDetail.customers[0] : {} ;
				this.histories = this.customerDetail.histories || [];
				this.customer = this.formatCustomer(this.customer);
				console.log('customerDetail: ', this.customerDetail);
				console.log('customer: ', this.customer);
				console.log('histories: ', this.histories);
			} else {
				//啥都没有
				this.customerDetail = {};
			}
			console.log('customer: ', this.customer);
		}, err => console.error(err));
	}
	formatCustomer(customer) {
		const currentYear = (new Date()).getFullYear();
		customer.age = currentYear - customer.birthYear;
		customer.sex = customer.gender === 0 ? '女' : customer.gender === 1 ? '男' : '其它';
		return customer;
	}
}
