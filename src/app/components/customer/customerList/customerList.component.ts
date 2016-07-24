import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import {  CustomerApi, Customer } from 'client';
import { MainLogoComponent, PageFooterComponent, NavbarComponent, MenusComponent, SearchBarComponent } from 'common';


@Component({
	moduleId: module.id,
	selector: 'customer-list',
	template: require('./customerList.html'),
	styles: [require('./customerList.scss')],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NavbarComponent, MenusComponent, SearchBarComponent, PageFooterComponent],
	providers: [HTTP_PROVIDERS, CustomerApi ]
})

export class CustomerListComponent {
	customers: Customer[] = [];
	searchStr: string = '';
	constructor(private cApi: CustomerApi, private params: RouteSegment, private router: Router) {
		this.searchStr = params.getParam('s') || '';
	}

	ngOnInit() {
		this.searchStr === '' ? this.getCustomers() : this.getSearchCustomers();
	}

	getCustomers() {
		this.cApi.customerListGet('d98019b3-c07c-4e90-ad1e-e4bc185be0f4', '1234').subscribe(data => {
			this.customers = data.data && data.data.length ? data.data : [];
			console.log('customers: ', this.customers);
		}, err => {
			console.error(err);
			this.customers = [];
		});
	}
	getSearchCustomers() {
		if ( this.searchStr === '' ) return;
		this.cApi.customerSearchPhoneOrVehicleLicenceGet(this.searchStr).subscribe( data => {
			if (data.data) {
				let dd = data.data;
				if ( dd.customers.length === 1 ) {
					this.router.navigate(['/customer-detail', { id: dd.customers[0].id }]);
				} else {
					this.customers = dd.customers;
				}
			} else {
				this.customers = [];
			}
		}, err => {
			console.error(err);
			this.customers = [];
		});
	}
	

	
}