import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

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
        const path = this.basePath + '/common/captcha';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
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
        // verify required parameter 'code' is set
        if (!code) {
            throw new Error('Missing required parameter code when calling commonCodeVerifyGet');
        }
        // verify required parameter 'phone' is set
        if (!phone) {
            throw new Error('Missing required parameter phone when calling commonCodeVerifyGet');
        }
        // verify required parameter 'uuid' is set
        if (!uuid) {
            throw new Error('Missing required parameter uuid when calling commonCodeVerifyGet');
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
            .map((response: Response) => response.json());
    }

}
