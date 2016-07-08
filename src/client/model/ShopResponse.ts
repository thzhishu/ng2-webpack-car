'use strict';
import * as models from './models';

/**
 * 门店信息
 */
export interface ShopResponse {
    

    meta?: models.BasicMeta;

    data?: models.ShopEx;

    error?: models.Error;
}
