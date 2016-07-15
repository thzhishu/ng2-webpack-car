import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class SurveyApi {
    protected basePath = 'http://car.mytianhui.com/api/v1';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * 加载问卷，默认一次加载所有页，以后如果有逻辑，建议客户端实现或服务端提供显示、隐藏某些题的接口 
     * 
     * @param url 问卷的url
     */
    public surveyLoadUrlGet (url: string, extraHttpRequestParams?: any ) : Observable<models.SurveyResponse> {
        const path = this.basePath + '/survey/load/{url}'
            .replace('{' + 'url' + '}', String(url));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'url' is set
        if (!url) {
            throw new Error('Missing required parameter url when calling surveyLoadUrlGet');
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
     * 提交问卷数据， 可以单题提交， 可以多题提交 
     * 
     * @param url 问卷的url
     * @param payload 答案的array json
     */
    public surveyUrlSubmitPost (url: string, payload: models.SurveySubmitRequest, extraHttpRequestParams?: any ) : Observable<models.SurveySubmitResponse> {
        const path = this.basePath + '/survey/{url}/submit'
            .replace('{' + 'url' + '}', String(url));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'url' is set
        if (!url) {
            throw new Error('Missing required parameter url when calling surveyUrlSubmitPost');
        }
        // verify required parameter 'payload' is set
        if (!payload) {
            throw new Error('Missing required parameter payload when calling surveyUrlSubmitPost');
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
