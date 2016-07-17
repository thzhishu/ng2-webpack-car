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
	selector: 'employee-add',
	template: require('./employeeAdd.html'),
	styles: [require('./employeeAdd.scss')],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NavbarComponent, MenusComponent],
	providers: [HTTP_PROVIDERS, UserApi, CommonApi, Md5, EmployeeApi ]
})

export class EmployeeAddComponent {
	employee: any;
	formErr: any;
	constructor(private router: Router, fb: FormBuilder, params: RouteSegment, private uApi: UserApi, private cApi: CommonApi, private eApi: EmployeeApi) {
		console.log(params);
		this.employee = {
			name: '',
			code: '',
			mobile: ''
		}
		this.formErr = {
			required: false,
			mobile: false
		}
		
		console.log(this.employee)
	}

	ngOnInit() {
		
	}
	save() {
		if(this.employee.name == "" && this.employee.code == "") {
			this.formErr.required = true;
			return false;
		}
		
		if(this.employee.mobile != "" && this.onCheckMobile()) {
			this.formErr.mobile = true;
			return false;
		}
		this.formErr = {
			required: false,
			mobile: false
		}
		console.log(this.employee.name, this.employee.code, this.employee.mobile);
		return this.eApi.employeeSavePost( this.employee.name, this.employee.code, this.employee.mobile );
	}
	onSave() {
		console.log(this.employee)
		
		let result = this.save();
		if(result) {
			result.subscribe(data=>{
				console.log('创建了一个新的员工');
				this.router.navigate(['/employee-list']);
			}, err=>{
				console.error('创建新的员工失败');
				console.error(err);
			})
		}
			
	}
	onSaveAndNew() {
		let result = this.save();
		if(result) {
			result.subscribe(data=>{
				console.log('创建了一个新的员工');
				this.employee = {
					name: '',
					code: '',
					mobile: ''
				}
			}, err=>{
				console.error('创建新的员工失败');
				console.error(err);
			})
		}
			
	}
	onReset() {

	}
	onHideTip(type) {
		this.formErr[type] = false;
	}
	onCheckMobile() {
		this.formErr.mobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(this.employee.mobile) ? false : true;
		return this.formErr.mobile;
	}
	
}