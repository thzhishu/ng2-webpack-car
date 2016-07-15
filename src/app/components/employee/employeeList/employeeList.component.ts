import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { UserApi, CommonApi, EmployeeApi } from 'client';
import { MainLogoComponent, PageFooterComponent, NavbarComponent, MenusComponent } from 'common';

@Component({
	moduleId: module.id,
	selector: 'employee-list',
	template: require('./employeeList.html'),
	styles: [require('./employeeList.scss')],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NavbarComponent, MenusComponent],
	providers: [HTTP_PROVIDERS, UserApi,  CommonApi, Md5, EmployeeApi ]
})

export class EmployeeListComponent {
	employeeList:any[] = [];
	deleteEmployee: any;
	winShow: number;
	constructor(private router: Router, fb: FormBuilder, params: RouteSegment, private uApi: UserApi, private cApi: CommonApi, private eApi: EmployeeApi) {
		console.log(params);
		this.employeeList = [];
		this.deleteEmployee = null;
		this.winShow = 0;
	}

	ngOnInit() {
		this.list();
	}
	list() {
		this.eApi.employeeListGet().subscribe(data => {
			console.log(data);
			this.employeeList = data.data;
		}, err => {
			console.error(err);
		});
	}

	onClose () {
		this.deleteEmployee = null;
		this.winShow = 0;
	}

	onAgreeDel() {
		this.eApi.employeeDeleteDelete(this.deleteEmployee.id).subscribe(data=> {
			console.log("删除员工", this.deleteEmployee.id);
			this.employeeList.splice(this.deleteEmployee.idx, 1);
			this.onClose();
		}, err => {});
	}

	onDel(employee, idx) {
		this.deleteEmployee = employee;
		this.deleteEmployee.idx = idx;
		this.winShow = 1;
	}





	
}