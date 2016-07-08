'use strict';
import * as models from './models';

export interface CustomerSearch {
    

    /**
     * 合计消费
     */
    totalAmount?: number;

    customers?: Array<models.Customer>;

    /**
     * 交易明细列表
     */
    histories?: Array<models.BusinessHistoryDetail>;
}
