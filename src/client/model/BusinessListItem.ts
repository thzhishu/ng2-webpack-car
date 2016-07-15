'use strict';
import * as models from './models';

/**
 * 生意
 */
export interface BusinessListItem {
    

    /**
     * id     
     */
    id?: number;

    /**
     * 时间 
     */
    date?: Date;

    /**
     * 顾客id    
     */
    customerId?: number;

    /**
     * 顾客姓名 
     */
    customer?: string;

    /**
     * 手机号 
     */
    mobile?: string;

    /**
     * 车牌号                
     */
    licence?: string;

    /**
     * 服务项目 
     */
    services?: string;

    /**
     * 消费金额 
     */
    amount?: number;

    /**
     * 主理技师 
     */
    employee?: string;

    /**
     * 满意度评分 
     */
    score?: number;
}
