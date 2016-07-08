"use strict";
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/Rx');
'use strict';
var EmployeeApi = (function () {
    function EmployeeApi(http, basePath) {
        this.http = http;
        this.basePath = 'http://car.mytianhui.com/api/v1';
        this.defaultHeaders = new http_1.Headers();
        if (basePath) {
            this.basePath = basePath;
        }
    }
    EmployeeApi.prototype.employeeListGet = function (extraHttpRequestParams) {
        var path = this.basePath + '/employee/list';
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
    EmployeeApi.prototype.employeeSavePost = function (name, code, mobile, extraHttpRequestParams) {
        var path = this.basePath + '/employee/save';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        var formParams = new http_1.URLSearchParams();
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');
        formParams['name'] = name;
        formParams['code'] = code;
        formParams['mobile'] = mobile;
        var requestOptions = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    EmployeeApi.prototype.employeeUpdatePost = function (id, name, code, mobile, extraHttpRequestParams) {
        var path = this.basePath + '/employee/update';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        var formParams = new http_1.URLSearchParams();
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');
        formParams['id'] = id;
        formParams['name'] = name;
        formParams['code'] = code;
        formParams['mobile'] = mobile;
        var requestOptions = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    EmployeeApi = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [http_1.Http, String])
    ], EmployeeApi);
    return EmployeeApi;
}());
exports.EmployeeApi = EmployeeApi;
//# sourceMappingURL=EmployeeApi.js.map