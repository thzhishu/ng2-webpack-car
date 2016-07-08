'use strict';
import * as models from './models';

export interface AcountInfo {
    

    /**
     * 账号套餐, 免费版，收费版等
     */
    packages?: string;

    /**
     * 门店列表
     */
    shops?: Array<models.Shop>;

    user?: models.User;
}
