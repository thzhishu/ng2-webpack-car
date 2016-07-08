'use strict';
import * as models from './models';

export interface BehaviorReport {
    

    summary?: models.BusinessSummary;

    /**
     * 趋势图
     */
    trends?: Array<models.BehaviorSalesTimeSeries>;

    /**
     * 生意明细列表
     */
    histories?: Array<models.BusinessHistoryDetail>;
}
