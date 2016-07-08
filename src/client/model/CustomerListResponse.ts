'use strict';
import * as models from './models';

/**
 * 后端返回的对象
 */
export interface CustomerListResponse {
    

    meta?: models.Meta;

    data?: Array<models.Customer>;

    error?: models.Error;
}
