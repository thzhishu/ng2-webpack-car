import { Component, Input, Output, NgZone,EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control, NgControlGroup } from '@angular/common';
import {MdCheckbox} from '@angular2-material/checkbox/checkbox';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

import { CommonApi, ShopApi, RegionApi, RegionItem } from 'client';

const YEARS_20 = [2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];
const STATION_10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

@Component({
  moduleId: module.id,
  selector: 'store-form',
  template: require('./storeForm.html'),
  styles: [require('./storeForm.scss')],
  directives: [FORM_DIRECTIVES, MdCheckbox],
  providers: [HTTP_PROVIDERS, CommonApi, ShopApi, RegionApi]
})

export class StoreFormComponent {
  shopList: any;
  provinceList: Array<RegionItem>;
  cityList: Array<RegionItem>;
  countyList: Array<RegionItem>;
  formGroup: any;
  sList: any;
  STATION_10: any;
  YEARS_20: any;
  loading: number = 0;
  errorServiceType: number = 0;

  @Input() store;
  @Output() success = new EventEmitter();

  constructor(private cApi: CommonApi, private sApi: ShopApi, private rApi: RegionApi) {

  }

  // 初始化
  ngOnInit() {
    this.getServiceType();
    this.getProvince();
    this.STATION_10 = STATION_10;
    this.YEARS_20 = YEARS_20;
  }

  // 获取省列表
  getProvince() {
    this.rApi.regionProvinceGet().subscribe(data => {
      if (data.meta.code === 200) {
        this.provinceList = data.data;
      }
    })
  }

  // 获取市列表
  getCity(provinceId: string) {
    this.rApi.regionProvinceIdCityGet(provinceId).subscribe(data => {
      if (data.meta.code === 200) {
        this.cityList = data.data;
      }
    })
  }

  // 获取区域列表
  // getCounty(cityId: string) {
  //   this.rApi.regionCityIdCountyGet(cityId).subscribe((data) => {
  //     if (data.meta.code === 200) {
  //       this.countyList = data.data;
  //     }
  //   })
  // }

  getServiceType() {
    this.cApi.commonDictServicesGet().subscribe(data => {
      if (data.meta.code === 200) {
        this.sList = data.data;
        this.shopList = [{ sList: _.cloneDeep(this.sList) }];
      }
    })
  }


  onAddShop(index) {
    this.shopList.splice(index + 1, 0, { sList: _.cloneDeep(this.sList) });
  }

  onDelhop(index) {
    this.shopList.splice(index, 1);
  }

  onChangeProvince(id) {
    this.getCity(id);
  }

  AssemblyServiceId(data) {
    this.errorServiceType = 1;
    let ay = [];
    let list = [];
    let obj = data;
    _.forEach(obj, (val, i) => {
      _.forEach(val.serviceIds, (sub, j) => {
        if (sub) {
          list.push(j);
          this.errorServiceType = 0;
        }
      })
      val.serviceIds = list.join(',');
      ay.push(val);
    })
    return ay;
  }

  onResigerShop(f) {
    this.loading = 1;
    let data = f.value;
    let post = this.AssemblyServiceId(data);
    if (this.errorServiceType) {
      return false;
    }
    // payload: models.Shop
    this.sApi.shopBatchSavePost(post).subscribe(data => {
      this.loading = 0;
      if (data.meta.code === 200) {
        this.success.next(data.data);
      } else {
        alert(data.error.message);
      }
    });
  }
}
