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
import { MainLogoComponent,PageFooterComponent } from 'common';

@Component({
    moduleId:module.id,
    selector: 'login-min',
    template: require('./loginMin.html'),
    styles: [ require('./loginMin.scss') ],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES,MainLogoComponent,PageFooterComponent],
    providers: [HTTP_PROVIDERS,UserApi,CommonApi,Md5],
})

export class LoginMinComponent {
    loginForm: ControlGroup;
    zone:any;
    user:any = {};
    seekDisabeld:number = 0;
    seekBtnTitle:number = 0;
    constructor(private router: Router,fb: FormBuilder, params: RouteSegment,private uApi:UserApi,private cApi:CommonApi) {
      this.zone = new NgZone({ enableLongStackTrace: false }); //事务控制器
      //表单验证
      this.loginForm = fb.group({
          'phone': [''],
          'rnd': [''],
          'pwd': [''],
      });
    }
    //初始化
    ngOnInit() {
      this.getCodeImg();
    }
    /**
     * 获取图片验证码
     * @return {[type]} [description]
     */
    getCodeImg(){
      this.cApi.commonCaptchaPost().subscribe(data => {
        console.log('this.cApi.commonCaptchaPost()');
        console.dir(data);
      })
    }
    onChangeCodeImg(){
      this.getCodeImg();
    }
    //注册
    onLogin(){
      console.log(this.loginForm);
      if(!this.loginForm.valid){
        alert('你输入的信息有误.不能完成登录');
        return false;
      }
      let params = this.loginForm.value;
      //mobile: string, password: string, code: string, captcha: string
      this.uApi.userRegisterPost(params.phone,params.pwd,params.code,params.rnd).subscribe(data => {
        console.log('this.cApi.userRegisterPost()');
        console.dir(data);
      })
    }

    toHome() {
        this.router.navigate(['']);
    }
    goBack() {
        window.history.back();
    }
}
