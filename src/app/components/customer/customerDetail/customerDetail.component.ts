import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { CustomerApi, Customer, BusinessDetail,BusinessHistoryDetail } from 'client';
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
	customer: any = {};
	histories: BusinessHistoryDetail;
	showCommentWin: Boolean = false;
	historyRecord: any = {};
	sendErr: any = {
		mobile: false,
		times: false
	};
	hasSend: Boolean = false;
	sendTimes: number = 0;
	tempMobile: string = '';

	constructor(private router: Router, private params: RouteSegment, private cApi: CustomerApi) {
		this.customerId = +params.getParam('id');
		if(!this.customerId) {
			router.navigate(['/customer-list']);
		}
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
		const gender = parseInt(customer.gender);
		customer.age = currentYear - customer.birthYear;
		customer.sex = gender === 0 ? '女' : gender === 1 ? '男' : '其它';
		return customer;
	}

	// 显示评价弹出层
	onShowCommentWin(record) {
		this.showCommentWin = true;
		this.historyRecord = record;

		console.log('historyRecord', this.historyRecord) ;
	}

	// 关闭评价弹出层
	onCloseCommentWin() {
		this.showCommentWin = false;
		this.historyRecord = {};
		console.log('func onCloseCommentWin() called....');
	}

	// 通过手机号发送
	onSend() {
		const mobile = this.customer.mobile || this.tempMobile;
		if (mobile === '' || !(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(mobile)) ) {
			this.sendErr.mobile = true;
			return;
		}
		console.log(mobile);
		// 成功
		this.hasSend = true;

	}

	// 重新通过手机号发送
	onResend() {
		if (!this.hasSend) return false;
		// 成功

	}

	// 评价弹出层电话输入框获取焦点
	onMobileFocus() {
		this.sendErr.mobile = false;
		this.sendErr.times = false;
	}


}
