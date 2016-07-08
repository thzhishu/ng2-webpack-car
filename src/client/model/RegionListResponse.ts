'use strict';
import * as models from './models';

/**
 * 员工列表返回结构
 */
export interface RegionListResponse {
    

    meta?: models.Meta;

    data?: Array<models.RegionItem>;

    error?: models.Error;
}
