import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { UserApi, CommonApi } from 'client';
import { MainLogoComponent, PageFooterComponent } from 'common';

@Component({
  moduleId: module.id,
  selector: 'forget-pwd',
  template: require('./forgetPwd.html'),
  styles: [require('./forgetPwd.scss')],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, MainLogoComponent, PageFooterComponent],
  providers: [HTTP_PROVIDERS, UserApi, CommonApi, Md5],
})

export class ForgetPwdComponent {
  fpForm: ControlGroup;
  newPwdForm: ControlGroup;
  zone: any;
  user: any = {};
  seekDisabeld: number = 0;
  seekBtnTitle: number = 0;
  next: number = 1;
  loading: number = 0;
  sign:string;
  img:any;
  diff:number = 0;

  constructor( private router: Router, fb: FormBuilder, params: RouteSegment, private uApi: UserApi, private cApi: CommonApi ) {
    this.zone = new NgZone({ enableLongStackTrace: false }); //事务控制器

    //表单验证
    this.fpForm = fb.group({
      'phone': [''],
      'rnd': [''],
      'code': [''],
    });
    this.newPwdForm = fb.group({
      'pwd': [''],
      'checkPwd': [''],
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
    this.cApi.commonCaptchaPost().subscribe((data:Response) => {
        this.img = 'data:image/jpeg;base64,'+ data.text();
        this.uApi.defaultHeaders.set('uuid', data.headers.get('uuid'));
    });
  }
  onChangeCodeImg() {
    this.getCodeImg();
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
          this.seekBtnTitle = null;
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
    this.sign = Md5.hashStr(phone + rnd + salt,false).toString();
    this.uApi.userPasswordSmsPost(phone, rnd, this.sign).subscribe(data => {

    })
  }
  //验证手机号
  onCheckPhone() {
    if (!this.fpForm.valid) {
      alert('你输入的信息有误.不能完成找回密码');
      return false;
    }
    let params = this.fpForm.value;
    params.uuid = this.uApi.defaultHeaders.get('uuid');
    //code: string, phone: string, uuid: string,
    this.cApi.commonCodeVerifyGet(params.code, params.phone, params.uuid).subscribe(data => {
      if(data.meta.code===200){
        this.next = 2;
        this.sign = data.data.sign;
      }else{
        alert(data.error.message);
      }
    })
  }

  //重置密码
  onEditPwd() {
    if (!this.newPwdForm.valid) {
      alert('你输入的信息有误.不能完成重置密码');
      return false;
    }
    let params = this.newPwdForm.value;
    if(params.pwd!==params.checkPwd){
      alert('两次密码不一致');
      this.diff = 1;
    }else{
      this.diff = 0;
    }
    //password: string, rePassword: string, sign: string
    this.uApi.userUpdatePwdPost(Md5.hashStr(params.pwd,false).toString(), Md5.hashStr(params.checkPwd,false).toString(), this.sign).subscribe(data => {
      if(data.meta.code===200){
        this.next = 1;
        alert('密码修改成功');
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
