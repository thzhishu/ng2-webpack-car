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
import { MainLogoComponent, PageFooterComponent, NavbarComponent, MenusComponent, SearchBarComponent } from 'common';

@Component({
	moduleId: module.id,
	selector: 'modify-pwd',
	template: require('./modifyPwd.html'),
	styles: [require('./modifyPwd.scss')],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NavbarComponent, MenusComponent, SearchBarComponent, PageFooterComponent],
	providers: [HTTP_PROVIDERS, UserApi, CommonApi, Md5 ]
})

export class ModifyPwdComponent {
	pwd: any;

    mpwdForm: ControlGroup;
    active: Boolean;
    isEqual: Boolean = true;
	constructor(private router: Router, private fb: FormBuilder, private params: RouteSegment, private uApi: UserApi, private cApi: CommonApi) {
		this.mpwdForm = fb.group({
            'oldPassword': [''],
            'password': [''],
            'rePassword': ['']
        });
        this.active = true;


	}

	ngOnInit() {
		
	}

    onSave() {
        console.log(this.mpwdForm);
        if ( this.isEqual && this.mpwdForm.valid ) {
            let params = this.mpwdForm.value;
            this.uApi.userChangePwdPost(params.oldPassword, params.password, params.rePassword).subscribe(data => {
                console.dir(data);
                if (data.data && data.data.User) {
                    alert('密码修改成功');
                }
            });
        } else {
            alert('请输入正确的信息');
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
        // this.mpwdForm.controls.rePassword.isEq = 1;
        console.log(this.mpwdForm);
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    onCancel() {
        this.router.navigate(['/my-account']);
    }

    onRepasswordBlur () {
        let vals = this.mpwdForm.value;
        if ( vals.rePassword === '' ) {
            return;
        }
        if (vals.rePassword !== vals.password) {
            this.isEqual = false;
            return;
        } else {
            this.isEqual = true;
        }
    }

    onRepasswordFocus () {
        this.isEqual = true;
    }


}
