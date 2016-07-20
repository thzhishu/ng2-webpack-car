import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control, NgControlGroup } from '@angular/common';
import {MdCheckbox} from '@angular2-material/checkbox/checkbox';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'services';

import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';

import { UserApi, CommonApi, ShopApi, RegionApi, RegionItem } from 'client';
import { MainLogoComponent, PageFooterComponent } from 'common';

const YEARS_20 = [2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];
const STATION_10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

@Component({
  moduleId: module.id,
  selector: 'init-store',
  template: require('./initStore.html'),
  styles: [require('./initStore.scss')],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, MainLogoComponent, PageFooterComponent,MdCheckbox],
  providers: [HTTP_PROVIDERS, UserApi, CommonApi, ShopApi, RegionApi, Md5, Cookie]
})

export class InitStoreComponent {
  shopList: any;
  provinceList: Array<RegionItem>;
  cityList: Array<RegionItem>;
  countyList: Array<RegionItem>;
  formGroup: any;
  sList: any;

  constructor(private router: Router, private fb: FormBuilder, private params: RouteSegment, private uApi: UserApi, private cApi: CommonApi, private sApi: ShopApi, private rApi: RegionApi) {

  }
  // 初始化
  ngOnInit() {
    this.getServiceType();
    this.getProvince();
  }

  info(data) {
    console.dir(data);
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
    this.cApi.commonDictServicesPost().subscribe(data => {
      if (data.meta.code === 200) {
        this.sList = data.data;
        this.shopList = [{ sList: _.cloneDeep(this.sList) }];
      }
    })
  }


  onAddShop(index) {
    this.shopList.splice(index + 1, 0, { sList: _.cloneDeep(this.sList) });
    // this.shopList.push({sList:_.cloneDeep(this.sList)});
    console.log(this.shopList, index);
  }

  onDelhop(index) {
    this.shopList.splice(index, 1);
  }

  onChangeProvince(id) {
    this.getCity(id);
  }

  AssemblyServiceId(data) {
    _.forEach(data, (val, i) => {
      console.log(val, i);
      if(i==='serviceId'){
        let list = [];
        _.forEach(val, (sub, j) => {
          console.log(sub, j);
          if(sub.checked){
            list.push(sub.id);
          }
        })
        val = list;
      }
    })
  }

  onResigerShop(f) {
    console.log(f);
    // payload: models.MyShopResponse
    let data = f.value;
    // console.log(data);
    this.AssemblyServiceId(data);
    // this.sApi.defaultHeaders.set('content-type', 'application/json');
    // this.sApi.shopRegisterPost(data).subscribe(data => {
    //   console.log(data);
    // });
  }

  toHome() {
    this.router.navigate(['']);
  }
  goBack() {
    window.history.back();
  }
}
