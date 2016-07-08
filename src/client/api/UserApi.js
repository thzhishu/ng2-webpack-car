"use strict";
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/Rx');
'use strict';
var UserApi = (function () {
    function UserApi(http, basePath) {
        this.http = http;
        this.basePath = 'http://car.mytianhui.com/api/v1';
        this.defaultHeaders = new http_1.Headers();
        if (basePath) {
            this.basePath = basePath;
        }
        console.log('UserApi');
    }
    UserApi.prototype.userChangePwdPost = function (oldPassword, password, rePassword, extraHttpRequestParams) {
        var path = this.basePath + '/user/changePwd';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        var formParams = new http_1.URLSearchParams();
        if (!oldPassword) {
            throw new Error('Missing required parameter oldPassword when calling userChangePwdPost');
        }
        if (!password) {
            throw new Error('Missing required parameter password when calling userChangePwdPost');
        }
        if (!rePassword) {
            throw new Error('Missing required parameter rePassword when calling userChangePwdPost');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');
        formParams['oldPassword'] = oldPassword;
        formParams['password'] = password;
        formParams['rePassword'] = rePassword;
        var requestOptions = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    UserApi.prototype.userLoginPost = function (mobile, password, code, extraHttpRequestParams) {
        var path = this.basePath + '/user/login';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        var formParams = new http_1.URLSearchParams();
        if (!mobile) {
            throw new Error('Missing required parameter mobile when calling userLoginPost');
        }
        if (!password) {
            throw new Error('Missing required parameter password when calling userLoginPost');
        }
        if (!code) {
            throw new Error('Missing required parameter code when calling userLoginPost');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');
        formParams['mobile'] = mobile;
        formParams['password'] = password;
        formParams['code'] = code;
        var requestOptions = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    UserApi.prototype.userMeGet = function (token, extraHttpRequestParams) {
        var path = this.basePath + '/user/me';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (!token) {
            throw new Error('Missing required parameter token when calling userMeGet');
        }
        headerParams.set('token', token);
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    UserApi.prototype.userPasswordSmsPost = function (mobile, rnd, sign, extraHttpRequestParams) {
        var path = this.basePath + '/user/password/sms';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        var formParams = new http_1.URLSearchParams();
        if (!mobile) {
            throw new Error('Missing required parameter mobile when calling userPasswordSmsPost');
        }
        if (!rnd) {
            throw new Error('Missing required parameter rnd when calling userPasswordSmsPost');
        }
        if (!sign) {
            throw new Error('Missing required parameter sign when calling userPasswordSmsPost');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');
        formParams['mobile'] = mobile;
        formParams['rnd'] = rnd;
        formParams['sign'] = sign;
        var requestOptions = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    UserApi.prototype.userRegisterPost = function (mobile, password, code, captcha, extraHttpRequestParams) {
        var path = this.basePath + '/user/register';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        var formParams = new http_1.URLSearchParams();
        if (!mobile) {
            throw new Error('Missing required parameter mobile when calling userRegisterPost');
        }
        if (!password) {
            throw new Error('Missing required parameter password when calling userRegisterPost');
        }
        if (!code) {
            throw new Error('Missing required parameter code when calling userRegisterPost');
        }
        if (!captcha) {
            throw new Error('Missing required parameter captcha when calling userRegisterPost');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');
        formParams['mobile'] = mobile;
        formParams['password'] = password;
        formParams['code'] = code;
        formParams['captcha'] = captcha;
        var requestOptions = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    UserApi.prototype.userRegisterSmsPost = function (mobile, rnd, sign, extraHttpRequestParams) {
        var path = this.basePath + '/user/register/sms';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        var formParams = new http_1.URLSearchParams();
        if (!mobile) {
            throw new Error('Missing required parameter mobile when calling userRegisterSmsPost');
        }
        if (!rnd) {
            throw new Error('Missing required parameter rnd when calling userRegisterSmsPost');
        }
        if (!sign) {
            throw new Error('Missing required parameter sign when calling userRegisterSmsPost');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');
        formParams['mobile'] = mobile;
        formParams['rnd'] = rnd;
        formParams['sign'] = sign;
        var requestOptions = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    UserApi.prototype.userShopCurrentPost = function (shopId, extraHttpRequestParams) {
        var path = this.basePath + '/user/shop/current';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        var formParams = new http_1.URLSearchParams();
        if (!shopId) {
            throw new Error('Missing required parameter shopId when calling userShopCurrentPost');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');
        formParams['shopId'] = shopId;
        var requestOptions = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    UserApi.prototype.userUpdatePwdPost = function (password, rePassword, sign, extraHttpRequestParams) {
        var path = this.basePath + '/user/updatePwd';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        var formParams = new http_1.URLSearchParams();
        if (!password) {
            throw new Error('Missing required parameter password when calling userUpdatePwdPost');
        }
        if (!rePassword) {
            throw new Error('Missing required parameter rePassword when calling userUpdatePwdPost');
        }
        if (!sign) {
            throw new Error('Missing required parameter sign when calling userUpdatePwdPost');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');
        formParams['password'] = password;
        formParams['rePassword'] = rePassword;
        formParams['sign'] = sign;
        var requestOptions = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    UserApi = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [http_1.Http, String])
    ], UserApi);
    return UserApi;
}());
exports.UserApi = UserApi;
//# sourceMappingURL=UserApi.js.map