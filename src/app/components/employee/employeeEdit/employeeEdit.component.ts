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
import { EmployeeFormComponent } from '../employeeForm/employeeForm.component';

@Component({
	moduleId: module.id,
	selector: 'employee-edit',
	template: require('./employeeEdit.html'),
	styles: [require('./employeeEdit.scss')],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NavbarComponent, MenusComponent, EmployeeFormComponent],
	providers: [HTTP_PROVIDERS, UserApi, CommonApi, Md5, EmployeeApi ]
})

export class EmployeeEditComponent {
	employee: any;
	constructor(private router: Router, fb: FormBuilder, params: RouteSegment, private uApi: UserApi, private cApi: CommonApi, private eApi: EmployeeApi) {
		console.log(params);
		this.employee = {
			name: '',
			code: '',
			mobile: ''
		}
	}

	ngOnInit() {
		if(this.params.parameters.id) {
			this.eApi.employeeEmployeeIdGet('', this.params.parameters.id).subscrible(data=>{
				console.log(data);
			}, err=>{
				console.error(err);
			});
		}
	}
	

	
}