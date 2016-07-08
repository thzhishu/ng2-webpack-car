"use strict";
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/Rx');
'use strict';
var RegionApi = (function () {
    function RegionApi(http, basePath) {
        this.http = http;
        this.basePath = 'http://car.mytianhui.com/api/v1';
        this.defaultHeaders = new http_1.Headers();
        if (basePath) {
            this.basePath = basePath;
        }
    }
    RegionApi.prototype.regionCityIdCountyGet = function (cityId, extraHttpRequestParams) {
        var path = this.basePath + '/region/{cityId}/county'
            .replace('{' + 'cityId' + '}', String(cityId));
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (!cityId) {
            throw new Error('Missing required parameter cityId when calling regionCityIdCountyGet');
        }
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    RegionApi.prototype.regionProvinceGet = function (extraHttpRequestParams) {
        var path = this.basePath + '/region/province';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    RegionApi.prototype.regionProvinceIdCityGet = function (provinceId, extraHttpRequestParams) {
        var path = this.basePath + '/region/{provinceId}/city'
            .replace('{' + 'provinceId' + '}', String(provinceId));
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (!provinceId) {
            throw new Error('Missing required parameter provinceId when calling regionProvinceIdCityGet');
        }
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    RegionApi = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [http_1.Http, String])
    ], RegionApi);
    return RegionApi;
}());
exports.RegionApi = RegionApi;
//# sourceMappingURL=RegionApi.js.map