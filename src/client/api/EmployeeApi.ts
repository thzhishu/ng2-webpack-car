import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class EmployeeApi {
    protected basePath = 'http://car.mytianhui.com/api/v1';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * 返回当前门店员工                
     * 
     */
    public employeeListGet (extraHttpRequestParams?: any ) : Observable<models.EmployeeListResponse> {
        const path = this.basePath + '/employee/list';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * 新建员工    
     * 
     * @param name 姓名
     * @param code 技师编号
     * @param mobile 手机号
     */
    public employeeSavePost (name?: string, code?: string, mobile?: string, extraHttpRequestParams?: any ) : Observable<models.EmployeeResponse> {
        const path = this.basePath + '/employee/save';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let formParams = new URLSearchParams();

        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams['name'] = name;

        formParams['code'] = code;

        formParams['mobile'] = mobile;

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
     * 新建员工    
     * 
     * @param id 员工id
     * @param name 姓名
     * @param code 技师编号
     * @param mobile 手机号
     */
    public employeeUpdatePost (id?: string, name?: string, code?: string, mobile?: string, extraHttpRequestParams?: any ) : Observable<models.EmployeeResponse> {
        const path = this.basePath + '/employee/update';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let formParams = new URLSearchParams();

        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams['id'] = id;

        formParams['name'] = name;

        formParams['code'] = code;

        formParams['mobile'] = mobile;

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
