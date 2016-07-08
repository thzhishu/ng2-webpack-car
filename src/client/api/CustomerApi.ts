import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class CustomerApi {
    protected basePath = 'http://car.mytianhui.com/api/v1';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * 根据顾客id获取顾客详情和历史生意记录 
     * 
     * @param customerId 顾客id
     */
    public customerHistoryCustomerIdGet (customerId: string, extraHttpRequestParams?: any ) : Observable<models.CustomerSearchResponse> {
        const path = this.basePath + '/customer/history/{customerId}'
            .replace('{' + 'customerId' + '}', String(customerId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'customerId' is set
        if (!customerId) {
            throw new Error('Missing required parameter customerId when calling customerHistoryCustomerIdGet');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * 根据顾客id获取顾客详情和历史生意记录 
     * 
     * @param token 用户凭证
     * @param shopId 当前门店id
     */
    public customerListGet (token?: string, shopId?: string, extraHttpRequestParams?: any ) : Observable<models.CustomerListResponse> {
        const path = this.basePath + '/customer/list';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
            headerParams.set('token', token);

            headerParams.set('shopId', shopId);

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * 新增或者顾客信息 
     * 
     * @param vehicleLicence 车牌号
     * @param id 顾客id，如果新用户，则为null，如果老用户，则update
     * @param mobile 手机号
     * @param vehicleFrame 车架号
     * @param name 客户姓名
     * @param birthYear 出生年份
     * @param gender 性别,0女，1男， 2其他
     * @param vehicleBrand 车品牌
     * @param vehicleModel 车型号
     * @param vehicleYear 购买年份
     * @param vehicleMiles 行驶里程
     */
    public customerSaveOrUpdatePost (vehicleLicence: string, id?: string, mobile?: string, vehicleFrame?: string, name?: string, birthYear?: number, gender?: number, vehicleBrand?: string, vehicleModel?: string, vehicleYear?: number, vehicleMiles?: number, extraHttpRequestParams?: any ) : Observable<models.CustomerResponse> {
        const path = this.basePath + '/customer/saveOrUpdate';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let formParams = new URLSearchParams();

        // verify required parameter 'vehicleLicence' is set
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
     * 根据手机号和车牌号检索用户， 分两种情况:  1. 客户端先读取返回结构的customers:array， 如果array.length&gt;0，则显示客户列表  2. 如果customers只有一个用户， 则显示单用户信息，并且读取histories显示交易明细 
     * 
     * @param phoneOrVehicleLicence 手机号or车牌号
     */
    public customerSearchPhoneOrVehicleLicenceGet (phoneOrVehicleLicence: string, extraHttpRequestParams?: any ) : Observable<models.CustomerSearchResponse> {
        const path = this.basePath + '/customer/search/{phoneOrVehicleLicence}'
            .replace('{' + 'phoneOrVehicleLicence' + '}', String(phoneOrVehicleLicence));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'phoneOrVehicleLicence' is set
        if (!phoneOrVehicleLicence) {
            throw new Error('Missing required parameter phoneOrVehicleLicence when calling customerSearchPhoneOrVehicleLicenceGet');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * 根据车牌号返回用户信息
     * 如果有多辆车，返回当前车辆的信息，如果没有匹配车辆，则data是null
     * @param vehicleLicence 车牌号
     */
    public customerVehicleVehicleLicenceGet (vehicleLicence: string, extraHttpRequestParams?: any ) : Observable<models.CustomerResponse> {
        const path = this.basePath + '/customer/vehicle/{vehicleLicence}'
            .replace('{' + 'vehicleLicence' + '}', String(vehicleLicence));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'vehicleLicence' is set
        if (!vehicleLicence) {
            throw new Error('Missing required parameter vehicleLicence when calling customerVehicleVehicleLicenceGet');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

}
