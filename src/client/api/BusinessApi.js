"use strict";
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/Rx');
'use strict';
var BusinessApi = (function () {
    function BusinessApi(http, basePath) {
        this.http = http;
        this.basePath = 'http://car.mytianhui.com/api/v1';
        this.defaultHeaders = new http_1.Headers();
        if (basePath) {
            this.basePath = basePath;
        }
    }
    BusinessApi.prototype.businessDeleteDelete = function (id, extraHttpRequestParams) {
        var path = this.basePath + '/business/delete';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (!id) {
            throw new Error('Missing required parameter id when calling businessDeleteDelete');
        }
        if (id !== undefined) {
            queryParameters.set('id', id);
        }
        var requestOptions = {
            method: 'DELETE',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    BusinessApi.prototype.businessListGet = function (date, shopId, extraHttpRequestParams) {
        var path = this.basePath + '/business/list';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (!date) {
            throw new Error('Missing required parameter date when calling businessListGet');
        }
        if (!shopId) {
            throw new Error('Missing required parameter shopId when calling businessListGet');
        }
        if (date !== undefined) {
            queryParameters.set('date', date.toString());
        }
        if (shopId !== undefined) {
            queryParameters.set('shopId', shopId);
        }
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    BusinessApi.prototype.businessSaveOrUpdatePost = function (payload, extraHttpRequestParams) {
        var path = this.basePath + '/business/saveOrUpdate';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (!payload) {
            throw new Error('Missing required parameter payload when calling businessSaveOrUpdatePost');
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
    BusinessApi = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [http_1.Http, String])
    ], BusinessApi);
    return BusinessApi;
}());
exports.BusinessApi = BusinessApi;
//# sourceMappingURL=BusinessApi.js.map