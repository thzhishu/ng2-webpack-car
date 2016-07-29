import { Component, Input, Output, NgZone, OnChanges, SimpleChange } from '@angular/core';
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
import { Subject } from 'rxjs/Subject';

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
	submitting: Boolean = false;
	customerDefault: any;
	searchTermStream = new Subject<string>();
	items: Observable<any> = this.searchTermStream
			.debounceTime(500)
			.distinctUntilChanged()
			.switchMap((term: string, i) => {
				console.log('term: ', term, i);
				return this.cApi.customerVehicleVehicleLicenceGet(encodeURI(term));
			});
	constructor(private router: Router, private fb: FormBuilder, params: RouteSegment, private cApi: CustomerApi) {

		const currentYear = +(new Date()).getFullYear();
		this.birthdayYearArr = this.rangeArr(1950, currentYear).reverse();
		this.vehicleYearArr = this.rangeArr(1990, currentYear).reverse();
		this.customerDefault = {
			'id': '',
			'vehicleLicence': '',
			'mobile': '',
			'vehicleFrame': '',
			'name': '',
			'birthYear': '',
			'gender': '',
			'vehicleBrand': '',
			'vehicleModel': '',
			'vehicleYear': '',
			'vehicleMiles': ''
		}


	}

	ngOnInit() {
		this.initFb();
		this.items.subscribe(data => {
			this.vehiclePlateHas = data && data.data ? true : false;
		});
	}

	ngOnDestroy() {
		console.log('destroy');
		// this.items.unsubscribe();
	}

	ngOnChanges( changes ) {
		console.log(changes);
	}

	initFb() {
		console.log(this.customer);
		const oldVal = _.cloneDeep(this.customer || this.customerDefault);
		console.log('old-val', oldVal);
		this.customerForm = this.fb.group({
			'id': [oldVal.id],
			'vehicleLicence': [oldVal.vehicleLicence],
			'mobile': [oldVal.mobile],
			'vehicleFrame': [oldVal.vehicleFrame],
			'name': [oldVal.name],
			'birthYear': [oldVal.birthYear],
			'gender': [oldVal.gender],
			'vehicleBrand': [oldVal.vehicleBrand],
			'vehicleModel': [oldVal.vehicleModel],
			'vehicleYear': [oldVal.vehicleYear],
			'vehicleMiles': [oldVal.vehicleMiles]

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
		console.log(this.vehiclePlateNull,this.vehiclePlateLen,  this.vehiclePlateHas)
		if (this.vehiclePlateNull || this.vehiclePlateLen || this.vehiclePlateHas ) {
			return;
		}
		this.onMobileValid();
		if (this.mobileFormatValid) {
			return;
		}

		if (this.submitting) return;
		this.submitting = true;

		let vals = this.customerForm.value;
		this.cApi.customerSaveOrUpdatePost(vals.vehicleLicence || '', vals.id || '', vals.mobile || '', vals.vehicleFrame || '', vals.name || '', vals.birthYear || '', vals.gender || '', vals.vehicleBrand  || '', vals.vehicleModel  || '', vals.vehicleYear  || '', vals.vehicleMiles  || '').subscribe(data => {
			if (data.data) {
				this.submitting = false;
				// 需要继续创建
				if (isNew && willAddNew) {
					this.initFb();
					return;
				}
				// 添加一次
				if (isNew) {
					this.gotoListPage();
					return;
				}
				// 更新
				alert('修改成功');

			}
		}, err => {
			console.error(err)
			this.submitting = false;
		} );

	}

	vehiclePlateValid() {
		let vehicleLicence = this.customerForm.value.vehicleLicence;
		console.log(vehicleLicence)
		if (vehicleLicence === '') {
			this.vehiclePlateNull = true;
			return false;
		}
		this.vehiclePlateNull = false;
		if ( vehicleLicence.length < 7 || vehicleLicence.length > 9 ) {
			this.vehiclePlateLen = true;
			return false;
		}
		this.vehiclePlateLen = false;
		return true;
	}
	vehiclePlateAjax() {
		const val = this.customerForm.value.vehicleLicence;
		this.vehiclePlateLen = false;
		if (val.length > 6 && val.length < 10 ) {
			this.vehiclePlateHas = false;
			this.cApi.customerVehicleVehicleLicenceGet(encodeURI(val)).subscribe(data => {
				if (data.data) {
					this.vehiclePlateHas = true;
				}
			}, err => console.error(err));
		} else if ( val.length >= 10) {
			this.vehiclePlateHas = false;
			this.vehiclePlateLen = true;
		}
	}
	onMobileValid() {
		// let mobileErr = this.customerForm.controls.mobile.errors;
		// this.mobileFormatValid = mobileErr && mobileErr.pattern ? true : false;
	}
	onMobileFocus() {
		this.mobileFormatValid = false;
	}
	onVehiclePlateFocus() {
		this.vehiclePlateNull = false;
		this.vehiclePlateLen = false;
		// this.vehiclePlateHas = false;
	}

	subjectAjax() {
		const val = this.customerForm.value.vehicleLicence;
		this.vehiclePlateLen = false;
		this.vehiclePlateHas = false;
		if ( val.length > 6 && val.length < 10 ) {

			this.searchTermStream.next(val);
		} else if (val.length >= 10) {
			this.vehiclePlateHas = false;
			this.vehiclePlateLen = true;

		}
	}
}
