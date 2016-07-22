import { Component, Input, Output, NgZone } from '@angular/core';
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

@Component({
	moduleId: module.id,
	selector: 'customer-add',
	template: require('./customerAdd.html'),
	styles: [require('./customerAdd.scss')],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NavbarComponent, MenusComponent],
	providers: [HTTP_PROVIDERS, UserApi, CommonApi, Md5, CustomerApi ]
})

export class CustomerAddComponent {
	customerForm: ControlGroup;
	vehiclePlateNull: Boolean = false;
	vehiclePlateLen: Boolean = false;
	vehiclePlateHas: Boolean = false;
	mobileFormatValid: Boolean = false;
	constructor(private router: Router, fb: FormBuilder, params: RouteSegment, private cApi: CustomerApi) {
		console.log(params);
		this.customerForm = fb.group({
			'id': [''],
			'vehicleLicence': [''],
			'mobile': [''],
			'vehicleFrame': [''],
			'name': [''],
			'birthYear': [''],
			'gender': [''],
			'vehicleBrand': [''],
			'vehicleModel': [''],
			'vehicleYear': [''],
			'vehicleMiles': ['']

		});
	}

	ngOnInit() {
		
	}
	
	onSave() {
		console.dir(this.customerForm);
	}

	vehiclePlateValid() {
		if (this.customerForm.controls.vehicleLicence.value === '') {
			this.vehiclePlateNull = true;
			return false;
		}
		this.vehiclePlateNull = false;
		if (this.customerForm.controls.vehicleLicence.value.length !== 7) {
			this.vehiclePlateLen = true; 
			return false;
		}
		this.vehiclePlateLen = false;
		return true;
	}
	vehiclePlateAjax() {
		const val = this.customerForm.controls.vehicleLicence.value;
		this.vehiclePlateLen = false;
		if (val.length === 7 ) {
			this.vehiclePlateHas = false;
			this.cApi.customerVehicleVehicleLicenceGet(encodeURI(val)).subscribe(data => {
				if(data.data) {
					this.vehiclePlateHas = true;
				}
				console.log('vehicleLicence', data.data);
			}, err => console.error(err));
		} else if( val.length > 7 ) {
			this.vehiclePlateHas = false;
			this.vehiclePlateLen = true; 
		}
	}
	onMobileValid() {
		let mobileErr = this.customerForm.controls.mobile.errors;
		this.mobileFormatValid = mobileErr && mobileErr.pattern ? true : false;
	}
	onMobileFocus() {
		this.mobileFormatValid = false;
	}
	
}