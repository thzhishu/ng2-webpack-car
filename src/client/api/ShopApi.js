"use strict";
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/Rx');
'use strict';
var ShopApi = (function () {
    function ShopApi(http, basePath) {
        this.http = http;
        this.basePath = 'http://car.mytianhui.com/api/v1';
        this.defaultHeaders = new http_1.Headers();
        if (basePath) {
            this.basePath = basePath;
        }
    }
    ShopApi.prototype.shopDeleteDelete = function (id, code, extraHttpRequestParams) {
        var path = this.basePath + '/shop/delete';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (!id) {
            throw new Error('Missing required parameter id when calling shopDeleteDelete');
        }
        if (id !== undefined) {
            queryParameters.set('id', id);
        }
        if (code !== undefined) {
            queryParameters.set('code', code);
        }
        var requestOptions = {
            method: 'DELETE',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    ShopApi.prototype.shopMyshopGet = function (token, extraHttpRequestParams) {
        var path = this.basePath + '/shop/myshop';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (!token) {
            throw new Error('Missing required parameter token when calling shopMyshopGet');
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
    ShopApi.prototype.shopRegisterPost = function (payload, extraHttpRequestParams) {
        var path = this.basePath + '/shop/register';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (!payload) {
            throw new Error('Missing required parameter payload when calling shopRegisterPost');
        }
        var requestOptions = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(payload);
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    ShopApi.prototype.shopShopIdGet = function (token, shopId, extraHttpRequestParams) {
        var path = this.basePath + '/shop/{shopId}'
            .replace('{' + 'shopId' + '}', String(shopId));
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (!token) {
            throw new Error('Missing required parameter token when calling shopShopIdGet');
        }
        if (!shopId) {
            throw new Error('Missing required parameter shopId when calling shopShopIdGet');
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
    ShopApi.prototype.shopUpdatePost = function (payload, extraHttpRequestParams) {
        var path = this.basePath + '/shop/update';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (!payload) {
            throw new Error('Missing required parameter payload when calling shopUpdatePost');
        }
        var requestOptions = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(payload);
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    ShopApi = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [http_1.Http, String])
    ], ShopApi);
    return ShopApi;
}());
exports.ShopApi = ShopApi;
//# sourceMappingURL=ShopApi.js.map