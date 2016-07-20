import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { UserApi, CommonApi,ShopApi } from 'client';
import { MainLogoComponent, PageFooterComponent } from 'common';

@Component({
  moduleId: module.id,
  selector: 'register',
  template: require('./register.html'),
  styles: [require('./register.scss')],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, MainLogoComponent, PageFooterComponent],
  providers: [HTTP_PROVIDERS, UserApi, CommonApi,ShopApi, Md5],
})

export class RegisterComponent {
  rForm: ControlGroup;
  zone: any;
  user: any = {};
  seekDisabeld: number = 0;
  seekBtnTitle:any;
  openProtocol: number = 0;
  img: any;
  sign:string;
  constructor(private router: Router,private fb: FormBuilder,private params: RouteSegment, private uApi: UserApi, private cApi: CommonApi, private sApi: ShopApi) {
    this.zone = new NgZone({ enableLongStackTrace: false }); //事务控制器
    //表单验证
    this.rForm = fb.group({
      'phone': [''],
      'rnd': [''],
      'code': [''],
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
      this.img = 'data:image/jpeg;base64,'+ (data.text() || '');
      this.uApi.defaultHeaders.set('uuid', data.headers.get('uuid'));
    });
  }
  onChangeCode() {
    this.getCodeImg();
  }

  onOpenProtocol() {
    this.openProtocol = 1;
  }

  onClose() {
    this.openProtocol = 0;
  }

  /**
   * 点击发送验证码
   * @param  {[type]} phone 手机号码
   * @param  {[type]} rnd   图片验证码
   * @return {[type]}       [description]
   */
  onSeekPhone(phone, rnd) {
    if (this.seekDisabeld) {
      return;
    }
    if (!phone) {
      return;
    }
    if (!rnd) {
      return;
    }
    this.seekDisabeld = 1;
    this.seekBtnTitle = 60;
    this.getPhoneCode(phone, rnd);

    //倒计时
    let timeout = window.setInterval(() => {
      this.zone.run(() => {
        if (this.seekBtnTitle > 0) {
          this.seekBtnTitle--;
        } else {
          this.seekBtnTitle = '重新发送';
          this.seekDisabeld = 0;
        }
      });
    }, 1000);
  }
  /**
   * 请求手机验证码
   * @param  {[type]} phone 手机号码
   * @param  {[type]} rnd   图片验证码
   * @return {[type]}       状态
   */
  getPhoneCode(phone: string = '', rnd: string = '') {
    let salt = 'thzs0708';
    this.sign = Md5.hashStr(phone + rnd + salt).toString();
    this.uApi.userRegisterSmsPost(phone, rnd, this.sign).subscribe(data => {

    })
  }

  //注册
  onRegister() {
    console.log(this.rForm);
    if (!this.rForm.valid) {
      alert('你输入的信息有误.不能完成注册');
      return false;
    }
    let params = this.rForm.value;
    //mobile: string, password: string, code: string, captcha: string
    this.uApi.userRegisterPost(params.phone, params.pwd, params.code, params.rnd).subscribe(data => {
      let json = data.json();
      if(json.meta.code==200){
        this.uApi.defaultHeaders.token = data.headers.get('token') || 'token';
        this.router.navigate(['/login-min']);
        this.sApi.shopMyshopGet(data.data.User.token).subscribe(data => {
          if (data.meta.code === 200) {
            if (data.data.length > 0) {
              this.router.navigate(['/employee-list']);
            } else {
              this.router.navigate(['/init-store']);
            }
          }else{
            alert(data.error.message);
          }
        });
      }else{
        alert(data.error.message);
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
