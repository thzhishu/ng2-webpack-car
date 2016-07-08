"use strict";
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/Rx');
'use strict';
var CustomerApi = (function () {
    function CustomerApi(http, basePath) {
        this.http = http;
        this.basePath = 'http://car.mytianhui.com/api/v1';
        this.defaultHeaders = new http_1.Headers();
        if (basePath) {
            this.basePath = basePath;
        }
    }
    CustomerApi.prototype.customerHistoryCustomerIdGet = function (customerId, extraHttpRequestParams) {
        var path = this.basePath + '/customer/history/{customerId}'
            .replace('{' + 'customerId' + '}', String(customerId));
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (!customerId) {
            throw new Error('Missing required parameter customerId when calling customerHistoryCustomerIdGet');
        }
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    CustomerApi.prototype.customerListGet = function (token, shopId, extraHttpRequestParams) {
        var path = this.basePath + '/customer/list';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        headerParams.set('token', token);
        headerParams.set('shopId', shopId);
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    CustomerApi.prototype.customerSaveOrUpdatePost = function (vehicleLicence, id, mobile, vehicleFrame, name, birthYear, gender, vehicleBrand, vehicleModel, vehicleYear, vehicleMiles, extraHttpRequestParams) {
        var path = this.basePath + '/customer/saveOrUpdate';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        var formParams = new http_1.URLSearchParams();
        if (!vehicleLicence) {
            throw new Error('Missing required parameter vehicleLicence when calling customerSaveOrUpdatePost');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');
        formParams['id'] = id;
        formParams['vehicleLicence'] = vehicleLicence;
        formParams['mobile'] = mobile;
        formParams['vehicleFrame'] = vehicleFrame;
        formParams['name'] = name;
        formParams['birthYear'] = birthYear;
        formParams['gender'] = gender;
        formParams['vehicleBrand'] = vehicleBrand;
        formParams['vehicleModel'] = vehicleModel;
        formParams['vehicleYear'] = vehicleYear;
        formParams['vehicleMiles'] = vehicleMiles;
        var requestOptions = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    CustomerApi.prototype.customerSearchPhoneOrVehicleLicenceGet = function (phoneOrVehicleLicence, extraHttpRequestParams) {
        var path = this.basePath + '/customer/search/{phoneOrVehicleLicence}'
            .replace('{' + 'phoneOrVehicleLicence' + '}', String(phoneOrVehicleLicence));
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (!phoneOrVehicleLicence) {
            throw new Error('Missing required parameter phoneOrVehicleLicence when calling customerSearchPhoneOrVehicleLicenceGet');
        }
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    CustomerApi.prototype.customerVehicleVehicleLicenceGet = function (vehicleLicence, extraHttpRequestParams) {
        var path = this.basePath + '/customer/vehicle/{vehicleLicence}'
            .replace('{' + 'vehicleLicence' + '}', String(vehicleLicence));
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.defaultHeaders;
        if (!vehicleLicence) {
            throw new Error('Missing required parameter vehicleLicence when calling customerVehicleVehicleLicenceGet');
        }
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) { return response.json(); });
    };
    CustomerApi = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [http_1.Http, String])
    ], CustomerApi);
    return CustomerApi;
}());
exports.CustomerApi = CustomerApi;
//# sourceMappingURL=CustomerApi.js.map