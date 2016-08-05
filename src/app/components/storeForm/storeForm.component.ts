import { Component, Input, Output, NgZone, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {  ControlGroup, FormBuilder, Control, NgControlGroup } from '@angular/common';
import { MdCheckbox } from '@angular2-material/checkbox/checkbox';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

import { CommonApi, ShopApi, RegionApi, RegionItem } from 'client';

const YEARS_20 = [2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];
const STATION_10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const SERVICE_LIST = [{"id":1,"name":"快修快保"},{"id":2,"name":"美容改装"},{"id":3,"name":"轮胎专项"},{"id":4,"name":"综合维修"},{"id":5,"name":"其他"}];

@Component({
  moduleId: module.id,
  selector: 'store-form',
  template: require('./storeForm.html'),
  styles: [require('./storeForm.scss')],
  directives: [ROUTER_DIRECTIVES, MdCheckbox],
  providers: [HTTP_PROVIDERS, CommonApi, ShopApi, RegionApi]
})

export class StoreFormComponent {
  provinceList: Array<RegionItem>;
  cityList: Array<RegionItem>;
  // countyList: Array<RegionItem>;
  formGroup: any;
  sList: any;
  STATION_10: any;
  YEARS_20: any;
  SERVICE_LIST: any;
  loading: number = 0;
  errorServiceType: number = 0;
  sub:any;
  id:number;

  @Input('store') shopList:any = [{}];
  @Output() success = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute,private cApi: CommonApi, private sApi: ShopApi, private rApi: RegionApi) {

  }

  // 初始化
  ngOnInit() {
    console.log(this.route);
    this.shopList = [{ sList: _.cloneDeep(SERVICE_LIST) }];
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log(this.id,'id',params);
      if(!isNaN(this.id)){
        this.getStoreList();
      }
		});
    // this.getServiceType();
    this.getProvince();
    this.STATION_10 = STATION_10;
    this.YEARS_20 = YEARS_20;
    this.SERVICE_LIST = SERVICE_LIST;
  }

  getStoreList(){
    this.sApi.shopMyshopGet().subscribe(data => {
      this.loading = 0;
      if (data.meta.code === 200) {
        this.shopList = data.data.filter(data=>{
          return this.id == data.id;
        }).map((data)=>{
          data.sList = _.cloneDeep(SERVICE_LIST);
          data.sList.map((sub)=>{
            sub.checked = data.serviceIds.indexOf(sub.id)!=-1;
          })
          this.getCity(data.provinceId,data);
          return data;
        })
      } else {
        alert(data.error.message);
      }
    });
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
  getCity(provinceId: number,item) {
    this.rApi.regionProvinceIdCityGet(provinceId+'').subscribe(data => {
      if (data.meta.code === 200) {
        item.cityList = data.data;
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

  onChangeProvince(id,item) {
    this.getCity(id,item);
  }

  AssemblyServiceId(data) {
    this.errorServiceType = 1;
    let ay = [];
    let list = [];
    _.forEach(data, (val, i) => {
      _.forEach(this.shopList[i].sList, (sub, j) => {
        if (sub.checked) {
          list.push(sub.id);
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
      this.errorServiceType = 0;
      this.loading = 0;
      return false;
    }
    // payload: models.Shop
    console.log('post', post);
    if(this.id) {
      post[0].id = this.id;
      this.sApi.shopUpdatePost(post[0]).subscribe(data => {
        this.loading = 0;
        if (data.meta.code === 200) {
          this.success.emit(data.data);
        } else {
          alert(data.error.message);
        }
      }, err => console.log(err));
    } else {
      this.sApi.shopBatchSavePost(post).subscribe(data => {
        this.loading = 0;
        if (data.meta.code === 200) {
          this.success.emit(data.data);
        } else {
          alert(data.error.message);
        }
      });
    }
      
  }
}
