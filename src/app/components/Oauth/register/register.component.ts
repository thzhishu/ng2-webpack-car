import { Component, Input, Output,NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder,Control } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { UserApi,CommonApi } from 'client';

@Component({
    moduleId:module.id,
    selector: 'register',
    template: require('./register.html'),
    styles: [ require('./register.scss') ],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
    providers: [HTTP_PROVIDERS,UserApi,CommonApi,Md5],
})

export class RegisterComponent {
    rForm: FormGroup;
    user:any = {};
    seekDisabeld:number = 0;
    seekBtnTitle:string = null;
    constructor(private router: Router,fb: FormBuilder, params: RouteSegment,private uApi:UserApi,private cApi:CommonApi) {
      this.zone = new NgZone({ enableLongStackTrace: false });
      this.rForm = fb.group({
          'phone': [''],
          'phoneCode': [''],
          'pwd': [''],
          'rnd': [''],
      });
    }
    ngOnInit() {
      this.getCodeImg();
    }

    getCodeImg(){

      this.cApi.commonCaptchaPost().subscribe(data => {
        console.log('this.cApi.commonCaptchaPost()');
        console.dir(data);
      })
    }
    onSeekPhone(phone,rnd){
      if(this.seekDisabeld){
        return;
      }
      if(!phone){
        return;
      }
      if(!rnd){
        return;
      }
      this.seekDisabeld = 1;
      this.seekBtnTitle = 60;
      this.getPhoneCode(phone,rnd);
      let timeout = window.setInterval(() => {
        this.zone.run(() => {
          if(this.seekBtnTitle>0){
            this.seekBtnTitle--;
          }else{
            this.seekBtnTitle = null;
            this.seekDisabeld = 0;
          }
        });
      }, 1000);
    }

    getPhoneCode(phone,rnd){
      const salt = 'thzs0708';
      let sign = Md5.hashStr(phone+rnd+salt);
      this.uApi.userPasswordSmsPost(phone,rnd,sign).subscribe(data => {
        console.log('this.cApi.userPasswordSmsPost()');
        console.dir(data);
      })
    }

    onRegister(){
      console.log(this.rForm);
    }

    toHome() {
        this.router.navigate(['']);
    }
    goBack() {
        window.history.back();
    }
}
