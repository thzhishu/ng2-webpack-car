import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { UserApi, CommonApi, ShopApi, UserResponse } from 'client';
import { MainLogoComponent, PageFooterComponent } from 'common';
import { Cookie } from 'services';

@Component({
  moduleId: module.id,
  selector: 'login-min',
  template: require('./loginMin.html'),
  styles: [require('./loginMin.scss')],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, MainLogoComponent, PageFooterComponent],
  providers: [HTTP_PROVIDERS, UserApi, CommonApi, ShopApi, Md5, Cookie]
})

export class LoginMinComponent {
  loginForm: ControlGroup;
  zone: any;
  user: any = {};
  seekDisabeld: number = 0;
  seekBtnTitle: number = 0;
  img: any;
  loading: number = 0;
  constructor(private router: Router, fb: FormBuilder, private route: ActivatedRoute, private uApi: UserApi, private cApi: CommonApi, private sApi: ShopApi) {
    this.zone = new NgZone({ enableLongStackTrace: false }); // 事务控制器
    // 表单验证
    this.loginForm = fb.group({
      'phone': [''],
      'rnd': [''],
      'pwd': ['']
    });
  }
  // 初始化
  ngOnInit() {
    this.getCodeImg();
  }
  /**
   * 获取图片验证码
   * @return {[type]} [description]
   */
  getCodeImg() {
    this.cApi.commonCaptchaBase64Post().subscribe((data: Response) => {
      this.img = 'data:image/jpeg;base64,' + (data.text() || '');
      this.uApi.defaultHeaders.set('uuid', data.headers.get('uuid'));
    });
  }
  onChangeCodeImg() {
    this.getCodeImg();
  }
  // 登录
  onLogin() {
    this.loading = 1;
    if (!this.loginForm.valid) {
      alert('你输入的信息有误.不能完成登录');
      this.loading = 0;
      return false;
    }
    let params = this.loginForm.value;
    // mobile: string, password: string, code: string,
    this.uApi.userLoginPost(params.phone, Md5.hashStr(params.pwd, false).toString(), params.rnd)
      .subscribe((data) => {
        this.loading = 0;
        if (data.meta.code === 200) {
          Cookie.save('token', data.data.User.token, 7);
          Cookie.save('shopId', data.data.User.lastShopId);
          this.sApi.defaultHeaders.set('token', data.data.User.token);
          if (data.data.User.lastShopId === null) {
            this.router.navigate(['/dashbroad/init-store']);
          } else {
            this.sApi.defaultHeaders.set('shopId', data.data.User.lastShopId);
            this.router.navigate(['/dashbroad/business-list']);
          }
        } else {
          alert(data.error.message);
        }
      });
  }

  toHome() {
    this.router.navigate(['']);
  }
  goBack() {
    window.history.back();
  }
}
