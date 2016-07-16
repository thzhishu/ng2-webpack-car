import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class UserApi {
    protected basePath = 'http://localhost:3000/api/v1';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * 登录之后修改密码， 通过原密码修改 
     * 
     * @param oldPassword 旧密码
     * @param password 新密码
     * @param rePassword 确认密码
     */
    public userChangePwdPost (oldPassword: string, password: string, rePassword: string, extraHttpRequestParams?: any ) : Observable<models.UserResponse> {
        const path = this.basePath + '/user/changePwd';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let formParams = new URLSearchParams();

        // verify required parameter 'oldPassword' is set
        if (!oldPassword) {
            throw new Error('Missing required parameter oldPassword when calling userChangePwdPost');
        }
        // verify required parameter 'password' is set
        if (!password) {
            throw new Error('Missing required parameter password when calling userChangePwdPost');
        }
        // verify required parameter 'rePassword' is set
        if (!rePassword) {
            throw new Error('Missing required parameter rePassword when calling userChangePwdPost');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams['oldPassword'] = oldPassword;

        formParams['password'] = password;

        formParams['rePassword'] = rePassword;

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * 用户登录
     * 用户通过手机号，密码，验证码登录车门店系统。返回结构的lastShopId是最近选中门店id, 登录之后要选中该门店 
     * @param mobile 登录手机号
     * @param password 登录密码
     * @param code 验证码
     */
    public userLoginPost (mobile: string, password: string, code: string, extraHttpRequestParams?: any ) : Observable<models.UserResponse> {
        const path = this.basePath + '/user/login';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let formParams = new URLSearchParams();

        // verify required parameter 'mobile' is set
        if (!mobile) {
            throw new Error('Missing required parameter mobile when calling userLoginPost');
        }
        // verify required parameter 'password' is set
        if (!password) {
            throw new Error('Missing required parameter password when calling userLoginPost');
        }
        // verify required parameter 'code' is set
        if (!code) {
            throw new Error('Missing required parameter code when calling userLoginPost');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams['mobile'] = mobile;

        formParams['password'] = password;

        formParams['code'] = code;

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * 用户登录
     * 注销登出， 删除token缓存， 数据库token设置为null 
     */
    public userLogoutPost (extraHttpRequestParams?: any ) : Observable<models.CommonResponse> {
        const path = this.basePath + '/user/logout';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * 我的账户 
     * 
     * @param token 用户的登录凭证
     */
    public userMeGet (token: string, extraHttpRequestParams?: any ) : Observable<models.MyAcountResponse> {
        const path = this.basePath + '/user/me';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'token' is set
        if (!token) {
            throw new Error('Missing required parameter token when calling userMeGet');
        }
            headerParams.set('token', token);

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * 发送找回密码验证码 
     * 
     * @param mobile 手机号
     * @param rnd 4位随机数， 客户端生成
     * @param sign 签名, md5(phone+rnd+salt)， 其中salt&#x3D;thzs0708， 不符合签名的请求一律返回错误
     */
    public userPasswordSmsPost (mobile: string, rnd: string, sign: string, extraHttpRequestParams?: any ) : Observable<models.CommonResponse> {
        const path = this.basePath + '/user/password/sms';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let formParams = new URLSearchParams();

        // verify required parameter 'mobile' is set
        if (!mobile) {
            throw new Error('Missing required parameter mobile when calling userPasswordSmsPost');
        }
        // verify required parameter 'rnd' is set
        if (!rnd) {
            throw new Error('Missing required parameter rnd when calling userPasswordSmsPost');
        }
        // verify required parameter 'sign' is set
        if (!sign) {
            throw new Error('Missing required parameter sign when calling userPasswordSmsPost');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams['mobile'] = mobile;

        formParams['rnd'] = rnd;

        formParams['sign'] = sign;

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * 用户注册
     * 
     * @param mobile 手机号
     * @param password 密码
     * @param code 手机验证码
     * @param captcha 图形验证码
     */
    public userRegisterPost (mobile: string, password: string, code: string, captcha: string, extraHttpRequestParams?: any ) : Observable<models.UserResponse> {
        const path = this.basePath + '/user/register';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let formParams = new URLSearchParams();

        // verify required parameter 'mobile' is set
        if (!mobile) {
            throw new Error('Missing required parameter mobile when calling userRegisterPost');
        }
        // verify required parameter 'password' is set
        if (!password) {
            throw new Error('Missing required parameter password when calling userRegisterPost');
        }
        // verify required parameter 'code' is set
        if (!code) {
            throw new Error('Missing required parameter code when calling userRegisterPost');
        }
        // verify required parameter 'captcha' is set
        if (!captcha) {
            throw new Error('Missing required parameter captcha when calling userRegisterPost');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams['mobile'] = mobile;

        formParams['password'] = password;

        formParams['code'] = code;

        formParams['captcha'] = captcha;

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * 发送注册验证码， 注册验证码只能用在注册，后端放入reids，设置timeout，做单限制/单ip发送次数?
     * 
     * @param mobile 手机号
     * @param rnd 4位随机数， 客户端生成
     * @param sign 签名, md5(phone+rnd+salt)， 其中salt&#x3D;thzs0708, 不符合签名的请求一律返回错误
     */
    public userRegisterSmsPost (mobile: string, rnd: string, sign: string, extraHttpRequestParams?: any ) : Observable<models.CommonResponse> {
        const path = this.basePath + '/user/register/sms';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let formParams = new URLSearchParams();

        // verify required parameter 'mobile' is set
        if (!mobile) {
            throw new Error('Missing required parameter mobile when calling userRegisterSmsPost');
        }
        // verify required parameter 'rnd' is set
        if (!rnd) {
            throw new Error('Missing required parameter rnd when calling userRegisterSmsPost');
        }
        // verify required parameter 'sign' is set
        if (!sign) {
            throw new Error('Missing required parameter sign when calling userRegisterSmsPost');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams['mobile'] = mobile;

        formParams['rnd'] = rnd;

        formParams['sign'] = sign;

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * 切换门店时候调用该方法， 服务端保存用户选择的门店，下次登录默认显示该门店
     * 
     * @param shopId 手机号
     */
    public userShopCurrentPost (shopId: string, extraHttpRequestParams?: any ) : Observable<models.CommonResponse> {
        const path = this.basePath + '/user/shop/current';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let formParams = new URLSearchParams();

        // verify required parameter 'shopId' is set
        if (!shopId) {
            throw new Error('Missing required parameter shopId when calling userShopCurrentPost');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams['shopId'] = shopId;

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * 不用登录系统, 通过手机验证码验明身份后修改密码。 通过凭证去修改密码， 服务端要验证凭证可靠性，和手机号关联, 5分钟timeout 
     * 
     * @param password 密码
     * @param rePassword 确认密码
     * @param sign /common/code/verify返回的sign
     */
    public userUpdatePwdPost (password: string, rePassword: string, sign: string, extraHttpRequestParams?: any ) : Observable<models.UserResponse> {
        const path = this.basePath + '/user/updatePwd';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let formParams = new URLSearchParams();

        // verify required parameter 'password' is set
        if (!password) {
            throw new Error('Missing required parameter password when calling userUpdatePwdPost');
        }
        // verify required parameter 'rePassword' is set
        if (!rePassword) {
            throw new Error('Missing required parameter rePassword when calling userUpdatePwdPost');
        }
        // verify required parameter 'sign' is set
        if (!sign) {
            throw new Error('Missing required parameter sign when calling userUpdatePwdPost');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams['password'] = password;

        formParams['rePassword'] = rePassword;

        formParams['sign'] = sign;

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

}
