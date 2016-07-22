import { Component, Input, Output } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { UserApi, CommonApi } from 'client';
import { MainLogoComponent, PageFooterComponent, NavbarComponent, MenusComponent } from 'common';

@Component({
	moduleId: module.id,
	selector: 'modify-pwd',
	template: require('./modifyPwd.html'),
	styles: [require('./modifyPwd.scss')],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NavbarComponent, MenusComponent],
	providers: [HTTP_PROVIDERS, UserApi, CommonApi, Md5 ]
})

export class ModifyPwdComponent {
	pwd: any;

    mpwdForm: ControlGroup;
    active: Boolean;
    //fb: FormBuilder;
    //router: Router;
	constructor(private router: Router, private fb: FormBuilder, private params: RouteSegment, private uApi: UserApi, private cApi: CommonApi) {
		this.mpwdForm = fb.group({
            'oldPassword': [''],
            'password': [''],
            'rePassword': ['']
        });
        this.active = true;
		
        
	}

	ngOnInit() {
		this.mpwdForm.controls.rePassword.isEq = 1;
	}
	
    onSave() {
        console.log(this.mpwdForm);
        if(this.mpwdForm.controls.rePassword.isEq && this.mpwdForm.valid ) {
            let params = this.mpwdForm.value;
            this.uApi.userChangePwdPost(params.oldPassword,params.password,params.rePassword).subscribe(data => {
                console.log('this.cApi.userChangePwdPost()');
                console.dir(data);
                alert('密码修改成功');
            })
        } else {
            alert('你输入的信息有误');
            console.log(this.mpwdForm);
            return false;
        }
        
    }
    onReset() {
        this.mpwdForm = this.fb.group({
            'oldPassword': [''],
            'password': [''],
            'rePassword': ['']
        });
        this.mpwdForm.controls.rePassword.isEq = 1;
        console.log(this.mpwdForm);
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }
    onCancel() {
        this.router.navigate(['/my-account']);
    }
    onRepasswordBlur () {
        if(!this.mpwdForm.controls.rePassword.valid) {
            this.mpwdForm.controls.rePassword.isEq = 1;
            return;
        }
        this.mpwdForm.controls.rePassword.isEq = this.mpwdForm.controls.rePassword.value == this.mpwdForm.controls.password.value ? 1 : 0;
    }
    onRepasswordFocus () {
        this.mpwdForm.controls.rePassword.isEq = 1;
    }
    
	
}