'use strict';
import * as models from './models';

/**
 * 后端返回的对象
 */
export interface CustomerResponse {
    

    meta?: models.Meta;

    data?: models.Customer;

    error?: models.Error;
}
