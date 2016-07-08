'use strict';
import * as models from './models';

export interface BehaviorSalesTimeSeries {
    

    /**
     * 时间，服务端返回的格式'yyyy-MM-dd HH:mm'
     */
    date?: Date;

    /**
     * 营业额
     */
    sales?: number;

    /**
     * 生意条数
     */
    num?: number;
}
