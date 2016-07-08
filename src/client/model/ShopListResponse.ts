'use strict';
import * as models from './models';

/**
 * 门店信息
 */
export interface ShopListResponse {
    

    meta?: models.BasicMeta;

    data?: Array<models.Shop>;

    error?: models.Error;
}
