import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class ReportApi {
    protected basePath = 'http://car.mytianhui.com/api/v1';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * 满意度报告   
     * 
     * @param startDate 开始时间，格式yyyy-MM-dd
     * @param endDate 结束时间，格式yyyy-MM-dd
     */
    public reportAttitudeGet (startDate?: Date, endDate?: Date, extraHttpRequestParams?: any ) : Observable<models.AttitudeReportResponse> {
        const path = this.basePath + '/report/attitude';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (startDate !== undefined) {
            queryParameters.set('startDate', startDate);
        }

        if (endDate !== undefined) {
            queryParameters.set('endDate', endDate);
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
     * 业务总结报告   
     * 
     * @param startDate 开始时间，格式yyyy-MM-dd
     * @param endDate 结束时间，格式yyyy-MM-dd
     */
    public reportBehaviorGet (startDate?: Date, endDate?: Date, extraHttpRequestParams?: any ) : Observable<models.BehaviorReportResponse> {
        const path = this.basePath + '/report/behavior';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (startDate !== undefined) {
            queryParameters.set('startDate', startDate);
        }

        if (endDate !== undefined) {
            queryParameters.set('endDate', endDate);
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
