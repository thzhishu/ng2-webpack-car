import { Component, Input, Output, NgZone, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {  ControlGroup, FormBuilder, Control } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { UserApi, CommonApi, CustomerApi, Customer } from 'client';
import { MainLogoComponent, PageFooterComponent, NavbarComponent, MenusComponent, SearchBarComponent } from 'common';
import { CustomerFormComponent } from '../customerForm/customerForm.component';
import { DialogService } from 'services';

@Component({
	moduleId: module.id,
	selector: 'customer-eidt',
	template: require('./customerEdit.html'),
	styles: [require('./customerEdit.scss')],
	directives: [ROUTER_DIRECTIVES,  NavbarComponent, MenusComponent, CustomerFormComponent, SearchBarComponent, PageFooterComponent],
	providers: [HTTP_PROVIDERS, UserApi, CommonApi, Md5, CustomerApi, DialogService ]
})

export class CustomerEditComponent {
	customerFields: any;
	customerId:number;
	sub:any;

	@ViewChild(CustomerFormComponent) cf: CustomerFormComponent;
	constructor(private router: Router, fb: FormBuilder, private route: ActivatedRoute,  private cApi: CustomerApi, private dialogService: DialogService ) {

	}

	ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.customerId = +params['id'];
			this.getCustomerById(this.customerId);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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

	canDeactivate(): Observable<boolean> | boolean {
		if ( this.cf.hasChange() ) {
			return true;
		}
		let p = this.dialogService.confirm('当前页面尚有信息未保存，是否离开？点击确定则显示搜索结果，点击取消还原原页面');
		let o = Observable.fromPromise(p);
		return o;
	}


}
