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
	selector: 'customer-form',
	template: require('./customerForm.html'),
	styles: [require('./customerForm.scss')],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NavbarComponent, MenusComponent],
	providers: [HTTP_PROVIDERS, UserApi, CommonApi, Md5, CustomerApi ]
})

export class CustomerFormComponent {
    @Input() customer;
	customerForm: ControlGroup;
	vehiclePlateNull: Boolean = false;
	vehiclePlateLen: Boolean = false;
	vehiclePlateHas: Boolean = false;
	mobileFormatValid: Boolean = false;
	birthdayYearArr: number[] = [];
	vehicleYearArr: number[] = [];
	active: Boolean = true;
	constructor(private router: Router, private fb: FormBuilder, params: RouteSegment, private cApi: CustomerApi) {
		this.initFb();
		const currentYear = +(new Date()).getFullYear();
		this.birthdayYearArr = this.rangeArr(1950, currentYear).reverse();
		this.vehicleYearArr = this.rangeArr(1990, currentYear).reverse();
        console.log(Object.assign({}, this.customer));
	}

	ngOnInit() {
		
	}

	initFb() {
		this.customerForm = this.fb.group({
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
		this.active = false;
        setTimeout(() => this.active = true, 0);
	}

	rangeArr (start, end) {
        return Array(end - start + 1).fill(0).map((v, i) => i + start);
    }
	// 去顾客列表页
	gotoListPage() {
		this.router.navigate(['/customer-list']);
	}
	
	onSave( other ) {
		const willAddNew = other || false;
		const isNew = this.customerForm.value.id ? false : true;
		this.vehiclePlateValid();
		if (this.vehiclePlateNull || this.vehiclePlateLen || this.vehiclePlateHas ) {
			return;
		}
		this.onMobileValid();
		if (this.mobileFormatValid) {
			return;
		}

		let vals = this.customerForm.value;

		this.cApi.customerSaveOrUpdatePost(vals.vehicleLicence, vals.id, vals.mobile, vals.vehicleFrame, vals.name, vals.birthYear, vals.gender, vals.vehicleBrand, vals.vehicleModel, vals.vehicleYear, vals.vehicleMiles).subscribe(data => {
			if (data.data) {
				// 需要继续创建
				if (isNew && willAddNew) {
					this.initFb();
					return;
				}
				if (isNew) {
					this.gotoListPage();
					return;
				}
			}
		}, err => console.error(err) );

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
	onVehiclePlateFocus() {
		this.vehiclePlateNull = false;
		this.vehiclePlateLen = false;
		// this.vehiclePlateHas = false;
	}
}