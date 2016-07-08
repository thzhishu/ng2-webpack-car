import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class ShopApi {
    protected basePath = 'http://car.mytianhui.com/api/v1';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * 逻辑删除门店，注意： 如果门店已经存在生意、员工、顾客， 则删除门店需要手机验证码.  
     * 客户端做法:  1. 客户端调用此方法，如果返回值askForCode&#x3D;1, 则要求用户输入验证码，客户端再次调用delete方法  2. 客户端调用此方法，如果返回值askForCode&lt;&gt;1，说明删除成功 服务端做法:  1. 如果code为空， 判断该门店是否有生意、员工、顾客      1.1 如果有, 则返回 askForCode&#x3D;1， 不删除      1.2 如果没有， 直接删除  2. 如果code不为空， 验证是否合法， 以此决定是否删除        
     * @param id 门店id
     * @param code 手机验证码
     */
    public shopDeleteDelete (id: string, code?: string, extraHttpRequestParams?: any ) : Observable<models.ShopResponseEx> {
        const path = this.basePath + '/shop/delete';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling shopDeleteDelete');
        }
        if (id !== undefined) {
            queryParameters.set('id', id);
        }

        if (code !== undefined) {
            queryParameters.set('code', code);
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
     * 获取我们的门店列表，用户凭证从http header读取 
     * 
     * @param token 用户的登录凭证
     */
    public shopMyshopGet (token: string, extraHttpRequestParams?: any ) : Observable<models.MyShopResponse> {
        const path = this.basePath + '/shop/myshop';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'token' is set
        if (!token) {
            throw new Error('Missing required parameter token when calling shopMyshopGet');
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
     * 注册新门店， 疑问总店标记， 店主标识， 分店或分支机构代码， 代码类型?? 
     * 
     * @param payload product
     */
    public shopRegisterPost (payload: models.Shop, extraHttpRequestParams?: any ) : Observable<models.ShopResponse> {
        const path = this.basePath + '/shop/register';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'payload' is set
        if (!payload) {
            throw new Error('Missing required parameter payload when calling shopRegisterPost');
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

    /**
     * 查询某个门店，用户凭证从http header读取 
     * 
     * @param token 用户的登录凭证
     * @param shopId 门店id
     */
    public shopShopIdGet (token: string, shopId: string, extraHttpRequestParams?: any ) : Observable<models.MyShopResponse> {
        const path = this.basePath + '/shop/{shopId}'
            .replace('{' + 'shopId' + '}', String(shopId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'token' is set
        if (!token) {
            throw new Error('Missing required parameter token when calling shopShopIdGet');
        }
        // verify required parameter 'shopId' is set
        if (!shopId) {
            throw new Error('Missing required parameter shopId when calling shopShopIdGet');
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
     * 更新门店 
     * 
     * @param payload 更新的门店对象数组
     */
    public shopUpdatePost (payload: Array<models.Shop>, extraHttpRequestParams?: any ) : Observable<Array<models.ShopListResponse>> {
        const path = this.basePath + '/shop/update';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'payload' is set
        if (!payload) {
            throw new Error('Missing required parameter payload when calling shopUpdatePost');
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
