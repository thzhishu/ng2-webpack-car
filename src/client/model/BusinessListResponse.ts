'use strict';
import * as models from './models';

/**
 * 生意列表
 */
export interface BusinessListResponse {
    

    meta?: models.Meta;

    data?: models.BusinessList;

    error?: models.Error;
}
