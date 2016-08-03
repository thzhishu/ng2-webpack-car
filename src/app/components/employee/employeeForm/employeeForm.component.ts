import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { UserApi, CommonApi, EmployeeApi } from 'client';
import { MainLogoComponent, PageFooterComponent, NavbarComponent, MenusComponent, SearchBarComponent } from 'common';


@Component({
	moduleId: module.id,
	selector: 'employee-form',
	template: require('./employeeForm.html'),
	styles: [require('./employeeForm.scss')],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NavbarComponent, MenusComponent, SearchBarComponent],
	providers: [HTTP_PROVIDERS, UserApi, CommonApi, Md5, EmployeeApi ]
})

export class EmployeeFormComponent {
	@Input() employee;
	formErr: any;

	constructor(private router: Router, fb: FormBuilder, private route: ActivatedRoute, private uApi: UserApi, private cApi: CommonApi, private eApi: EmployeeApi) {
		// this.employee = {
		// 	name: '',
		// 	code: '',
		// 	mobile: ''
		// }
		this.formErr = {
			required: false,
			mobile: false
		}


	}

	ngOnInit() {
		console.log('employee edit form components init');
		console.log("dd:", this.employee)
	}
	save() {
		if(this.employee.name === '' && this.employee.code === '') {
			this.formErr.required = true;
			return null;
		}

		if(this.employee.mobile !== '' && this.onCheckMobile()) {
			this.formErr.mobile = true;
			return null;
		}
		this.formErr = {
			required: false,
			mobile: false
		}
		console.log(this.employee.name, this.employee.code, this.employee.mobile);
		if (!this.employee.id) {
			return this.eApi.employeeSavePost( this.employee.name, this.employee.code, this.employee.mobile );
		}
		return this.eApi.employeeUpdatePost( this.employee.id, this.employee.name, this.employee.code, this.employee.mobile );
	}
	onSave() {
		console.log(this.employee)

		let result = this.save();
		if(result) {
			result.subscribe(data=>{
				console.log('创建了一个新的员工');
				this.onReset();
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
		this.router.navigate(['/dashbroad/employee-list']);
	}
	onHideTip(type) {
		this.formErr[type] = false;
	}
	onCheckMobile() {
		if (this.employee.mobile === '') {
			this.formErr.mobile = false;
		} else {
			this.formErr.mobile = /^(13[0-9]|15[012356789]|17[015678]|18[0-9]|14[579])[0-9]{8}$/.test(this.employee.mobile) ? false : true;
		}
		return this.formErr.mobile;
	}

}
