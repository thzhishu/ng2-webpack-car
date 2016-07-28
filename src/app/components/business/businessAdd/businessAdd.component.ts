import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control, NgControlGroup } from '@angular/common';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {MdCheckbox} from '@angular2-material/checkbox/checkbox';

import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { Cookie } from 'services';

import { BusinessApi, EmployeeApi, CustomerApi, Customer, EmployeeListItem,CustomerSearchResponse } from 'client';

@Component({
  moduleId: module.id,
  selector: 'business-add',
  template: require('./businessAdd.html'),
  styles: [require('./businessAdd.scss')],
  directives: [ROUTER_DIRECTIVES, MdCheckbox],
  providers: [HTTP_PROVIDERS, BusinessApi, EmployeeApi, CustomerApi]
})

export class BusinessAddComponent implements OnInit {
  @Input() businessShow: number;
  @Output() close = new EventEmitter();

  loading: number = 0;
  employeeList: Array<EmployeeListItem>;
  customer: Customer;
  employeeChecked: boolean = true;
  employeeInput: string = '';

  private searchVehicleCode = new Subject<CustomerSearchResponse>();

  private VehicleCode: Observable<CustomerSearchResponse> = this.searchVehicleCode
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap((term: string) => this.cApi.customerVehicleVehicleLicenceGet(term));


  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private bApi: BusinessApi, private eApi: EmployeeApi, private cApi: CustomerApi) {

  }
  // 初始化
  ngOnInit() {
    this.getEmployeeList();
    this.VehicleCode.subscribe(data => {
      if (data.meta.code === 200) {
        this.customer = data.data;
      } else {
        alert(data.error.message);
      }
    });
  }

  getEmployeeList() {
    this.eApi.employeeListGet().subscribe(data => {
      if (data.meta.code === 200) {
        this.employeeList = data.data;
      }
    });
  }

  isVehicleLength(f) {
    if (!f.value.vehicleLicence || f.value.vehicleLicence.length < 6) {
      return false;
    }
    return true;
  }

  onChangeVL(val) {
    if (!val.target.value || val.target.value.length < 6) {
      return false;
    }
    this.searchVehicleCode.next(val.target.value);
    // this.cApi.customerVehicleVehicleLicenceGet(val.target.value).subscribe(data => {
    //   if (data.meta.code === 200) {
    //     this.customer = data.data;
    //   } else {
    //     alert(data.error.message);
    //   }
    // })
  }

  onSubmit(f) {
    this.loading = 1;
    let data = f.value;
    data.shopId = Cookie.load('shopId');
    if (data.employeeId === 'other') {
      // payload: models.BusinessDetail
      this.eApi.employeeSavePost(this.employeeInput).subscribe(res => {
        this.loading = 0;
        if (res.meta.code === 200) {
          data.employeeId = res.data.id;
          this.save(data);
        } else {
          alert(res.error.message);
        }
      }, err => {
        this.loading = 0;
        console.error(err);
      });
    } else {
      this.save(data);
    }

  }

  save(data) {
    // payload: models.BusinessDetail
    this.bApi.businessSaveOrUpdatePost(data).subscribe(data => {
      this.loading = 0;
      if (data.meta.code === 200) {
        this.onClose();
      } else {
        alert(data.error.message);
      }
    }, err => {
      this.loading = 0;
      console.error(err);
    });
  }

  onClose() {
    this.close.next("event");
    this.businessShow = 0;
  }
}
