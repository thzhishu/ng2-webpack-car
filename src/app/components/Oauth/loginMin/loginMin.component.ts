import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { UserApi, CommonApi } from 'client';
import { MainLogoComponent, PageFooterComponent } from 'common';

@Component({
  moduleId: module.id,
  selector: 'login-min',
  template: require('./loginMin.html'),
  styles: [require('./loginMin.scss')],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, MainLogoComponent, PageFooterComponent],
  providers: [HTTP_PROVIDERS, UserApi, CommonApi, Md5],
})

export class LoginMinComponent {
  loginForm: ControlGroup;
  zone: any;
  user: any = {};
  seekDisabeld: number = 0;
  seekBtnTitle: number = 0;
  img:any;
  constructor(private router: Router, fb: FormBuilder, params: RouteSegment, private uApi: UserApi, private cApi: CommonApi) {
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
  getCodeImg() {
    this.cApi.commonCaptchaPost().subscribe(data => {
      this.img = 'data:image/jpeg;base64,' + (data.text() || '');
      this.uApi.defaultHeaders.set('uuid', data.headers.get('uuid'));
    });
  }
  onChangeCodeImg() {
    this.getCodeImg();
  }
  //登录
  onLogin() {
    if (!this.loginForm.valid) {
      alert('你输入的信息有误.不能完成登录');
      return false;
    }
    let params = this.loginForm.value;
    //mobile: string, password: string, code: string, 
    this.uApi.userLoginPost(params.phone, params.pwd, params.rnd).subscribe(data => {
      console.log('this.uApi.userLoginPost()');
      console.dir(data);
      let json = data.json();
      if(json.meta.code==200){
        this.uApi.defaultHeaders.token = data.headers.get('token');
        this.router.navigate(['/employee-list']);
      }
    })
  }

  toHome() {
    this.router.navigate(['']);
  }
  goBack() {
    window.history.back();
  }
}
