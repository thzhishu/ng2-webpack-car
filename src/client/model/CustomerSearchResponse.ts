'use strict';
import * as models from './models';

/**
 * 通过手机号或者车牌号检索顾客信息的返回结构
 */
export interface CustomerSearchResponse {
    

    meta?: models.Meta;

    data?: models.CustomerSearch;

    error?: models.Error;
}
