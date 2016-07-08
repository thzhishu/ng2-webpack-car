import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class RegionApi {
    protected basePath = 'http://car.mytianhui.com/api/v1';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * 获取区  
     * 
     * @param cityId 省份id
     */
    public regionCityIdCountyGet (cityId: string, extraHttpRequestParams?: any ) : Observable<models.CustomerSearchResponse> {
        const path = this.basePath + '/region/{cityId}/county'
            .replace('{' + 'cityId' + '}', String(cityId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'cityId' is set
        if (!cityId) {
            throw new Error('Missing required parameter cityId when calling regionCityIdCountyGet');
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
     * 获取省份              
     * 
     */
    public regionProvinceGet (extraHttpRequestParams?: any ) : Observable<models.RegionListResponse> {
        const path = this.basePath + '/region/province';

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
     * 获取城市  
     * 
     * @param provinceId 省份id
     */
    public regionProvinceIdCityGet (provinceId: string, extraHttpRequestParams?: any ) : Observable<models.RegionListResponse> {
        const path = this.basePath + '/region/{provinceId}/city'
            .replace('{' + 'provinceId' + '}', String(provinceId));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'provinceId' is set
        if (!provinceId) {
            throw new Error('Missing required parameter provinceId when calling regionProvinceIdCityGet');
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
