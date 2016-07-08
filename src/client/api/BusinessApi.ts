import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class BusinessApi {
    protected basePath = 'http://car.mytianhui.com/api/v1';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * 删除生意，后端需要验证是否属于自己的生意
     *
     * @param id 生意id
     */
    public businessDeleteDelete (id: string, extraHttpRequestParams?: any ) : Observable<models.CommonResponse> {
        const path = this.basePath + '/business/delete';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling businessDeleteDelete');
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
     * 今日生意
     *
     * @param date 时间
     * @param shopId 门店id
     */
    public businessListGet (date: Date, shopId: string, extraHttpRequestParams?: any ) : Observable<models.BusinessListResponse> {
        const path = this.basePath + '/business/list';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'date' is set
        if (!date) {
            throw new Error('Missing required parameter date when calling businessListGet');
        }
        // verify required parameter 'shopId' is set
        if (!shopId) {
            throw new Error('Missing required parameter shopId when calling businessListGet');
        }
        if (date !== undefined) {
            queryParameters.set('date', date.toString());
        }

        if (shopId !== undefined) {
            queryParameters.set('shopId', shopId);
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
     * 保存或新建服务项目
     *
     * @param payload 服务项目(生意或者交易)
     */
    public businessSaveOrUpdatePost (payload: models.BusinessDetail, extraHttpRequestParams?: any ) : Observable<models.CommonResponse> {
        const path = this.basePath + '/business/saveOrUpdate';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'payload' is set
        if (!payload) {
            throw new Error('Missing required parameter payload when calling businessSaveOrUpdatePost');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(payload);

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

}
