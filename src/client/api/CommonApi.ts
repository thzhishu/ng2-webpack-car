/**
 * 车门店 API
 * 前后端交互协议, 遵循以下约定:   1. 所有api都属于无状态接口   2. 除了/user/login,/_*_/sms,/user/register,/user/updatePwd接口，其他接口都要登录之后才能操作   3. 登录成功之后，后端每次都把token和shopId(当前门店)置入header,回传服务端   4. 客户端请求参数分两种:       1. 以form方式提交，可以附带store、pageNumber、pageSize参数       2. 以json方式提交，务必附带store、pageNumber、pageSize属性，如果没有值，为null   5. 服务端返回统一的json， 格式如下:       {        meta:{         code: 状态码         link: 链接         limit: 每页多少条         total:  总共多少条         current: 当前页         method: 方法         parameters: {  客户端的请求参数          startDate:开始时间          endDate:结束时间          ........:xxxx(请求参数都会在meta里面)                    },         store: { 客户端专用，保存交互状态的对象                  }         }        data:{ // 保存的数据，可能是array, object          object          list<object>          jsonArray        }        error:{           code:xxxxx (子状态码)           message:xxxxx        }       }            6. 公共状态(meta->code)约定如下:              500:             服务端处理失败， 返回json中存在error, meta对象， 不一定存在data对象          200:             成功， 返回json中有meta， data对象， 不存在error对象          401:             认证失败，用户的token过期或者token错误， 客户端需要引导用户重新登录          403:             授权失败， 一般出现在用户访问没有权限的资源, 返回json中存在error, meta对象          400:             参数错误,  客户端提交的参数不正确, 返回json中存在error, meta对象                 7. error的子状态码， 开发人员可以自行约定              
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

import { Cookie } from 'services';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class CommonApi {
    protected basePath = 'http://localhost:3000/api/v1';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * 验证码，返回的是stream， 客户端直接在图片src引用api url
     * 通过的验证码接口 
     */
    public commonCaptchaPost (extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/common/captchaBase64';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        headerParams.set('token', Cookie.load('token'));

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response;
                }
            });
    }

    /**
     * 找回密码，检验手机验证码有效性， 客户端在点下一步时候调用, 如果服务端返回200， 则json里个修改密码的凭证sign. 客户端需要将在/user/updatePwd接口用到sign 
     * 
     * @param code 手机验证码
     * @param phone 手机号
     * @param uuid 验证码接口返回的uuid
     */
    public commonCodeVerifyGet (code: string, phone: string, uuid: string, extraHttpRequestParams?: any ) : Observable<models.PasswordResponse> {
        const path = this.basePath + '/common/code/verify';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        headerParams.set('token', Cookie.load('token'));


        // verify required parameter 'code' is not null or undefined
        if (code === null || code === undefined) {
            throw new Error('Required parameter code was null or undefined when calling commonCodeVerifyGet.');
        }
        // verify required parameter 'phone' is not null or undefined
        if (phone === null || phone === undefined) {
            throw new Error('Required parameter phone was null or undefined when calling commonCodeVerifyGet.');
        }
        // verify required parameter 'uuid' is not null or undefined
        if (uuid === null || uuid === undefined) {
            throw new Error('Required parameter uuid was null or undefined when calling commonCodeVerifyGet.');
        }
        if (code !== undefined) {
            queryParameters.set('code', code);
        }

        if (phone !== undefined) {
            queryParameters.set('phone', phone);
        }

            headerParams.set('uuid', uuid);

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * 数据字典， 返回服务类型
     * 服务类型列表，服务端请使用缓存。做法:实现CleanAware接口，在clean里实现清理 
     */
    public commonDictServicesPost (extraHttpRequestParams?: any ) : Observable<models.ServiceResponse> {
        const path = this.basePath + '/common/dict/services';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        headerParams.set('token', Cookie.load('token'));


        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response;
                }
            });
    }

}
