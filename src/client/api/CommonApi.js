"use strict";
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/Rx');
'use strict';
var CommonApi = (function () {
    function CommonApi(http, basePath) {
        this.http = http;
        this.basePath = 'http://car.mytianhui.com/api/v1';
        this.defaultHeaders = new http_1.Headers();
        if (basePath) {
            this.basePath = basePath;
        }
    }
    CommonApi.prototype.commonCaptchaPost = function (extraHttpRequestParams) {
        var path = this.basePath + '/common/captcha';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        var requestOptions = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    CommonApi.prototype.commonCodeVerifyGet = function (code, phone, uuid, extraHttpRequestParams) {
        var path = this.basePath + '/common/code/verify';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (!code) {
            throw new Error('Missing required parameter code when calling commonCodeVerifyGet');
        }
        if (!phone) {
            throw new Error('Missing required parameter phone when calling commonCodeVerifyGet');
        }
        if (!uuid) {
            throw new Error('Missing required parameter uuid when calling commonCodeVerifyGet');
        }
        if (code !== undefined) {
            queryParameters.set('code', code);
        }
        if (phone !== undefined) {
            queryParameters.set('phone', phone);
        }
        headerParams.set('uuid', uuid);
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    CommonApi = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [http_1.Http, String])
    ], CommonApi);
    return CommonApi;
}());
exports.CommonApi = CommonApi;
//# sourceMappingURL=CommonApi.js.map