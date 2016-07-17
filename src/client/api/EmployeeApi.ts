import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class EmployeeApi {
    protected basePath = 'http://localhost:3000/api/v1';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * 删除员工 
     * 
     * @param id 员工id
     */
    public employeeDeleteDelete (id: string, extraHttpRequestParams?: any ) : Observable<models.CommonResponse> {
        const path = this.basePath + '/employee/delete';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling employeeDeleteDelete');
        }
        if (id !== undefined) {
            queryParameters.set('id', id);
        }

        let requestOptions: RequestOptionsArgs = {
            method: 'DELETE',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * 查询某个门店，用户凭证从http header读取 
     * 
     * @param token 凭证
     * @param employeeId 员工id
     */
    public employeeEmployeeIdGet (token: string, employeeId: string, extraHttpRequestParams?: any ) : Observable<models.EmployeeResponse> {
        const path = this.basePath + '/employee/{employeeId}'
            .replace('{' + 'employeeId' + '}', String(employeeId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'token' is set
        if (!token) {
            throw new Error('Missing required parameter token when calling employeeEmployeeIdGet');
        }
        // verify required parameter 'employeeId' is set
        if (!employeeId) {
            throw new Error('Missing required parameter employeeId when calling employeeEmployeeIdGet');
        }
            headerParams.set('token', token);

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
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
