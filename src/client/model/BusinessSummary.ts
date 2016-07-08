'use strict';
import * as models from './models';

/**
 * 生意汇总
 */
export interface BusinessSummary {
    

    /**
     * 生意数量
     */
    total?: number;

    /**
     * 营业额合计
     */
    amount?: number;

    /**
     * 平均客单价
     */
    perUserAmount?: number;

    /**
     * 满意度
     */
    score?: number;
}
