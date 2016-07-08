"use strict";
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/Rx');
'use strict';
var ReportApi = (function () {
    function ReportApi(http, basePath) {
        this.http = http;
        this.basePath = 'http://car.mytianhui.com/api/v1';
        this.defaultHeaders = new http_1.Headers();
        if (basePath) {
            this.basePath = basePath;
        }
    }
    ReportApi.prototype.reportAttitudeGet = function (startDate, endDate, extraHttpRequestParams) {
        var path = this.basePath + '/report/attitude';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (startDate !== undefined) {
            queryParameters.set('startDate', startDate.toString());
        }
        if (endDate !== undefined) {
            queryParameters.set('endDate', endDate.toString());
        }
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    ReportApi.prototype.reportBehaviorGet = function (startDate, endDate, extraHttpRequestParams) {
        var path = this.basePath + '/report/behavior';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (startDate !== undefined) {
            queryParameters.set('startDate', startDate.toString());
        }
        if (endDate !== undefined) {
            queryParameters.set('endDate', endDate.toString());
        }
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    ReportApi = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [http_1.Http, String])
    ], ReportApi);
    return ReportApi;
}());
exports.ReportApi = ReportApi;
//# sourceMappingURL=ReportApi.js.map