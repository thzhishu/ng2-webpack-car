'use strict';
import * as models from './models';

/**
 * 服务项目(交易/生意)， 应该从BusinessDetail继承
 */
export interface BusinessHistoryDetail {
    

    /**
     * id     
     */
    id?: string;

    /**
     * 服务项目 
     */
    name?: string;

    /**
     * 技师id             
     */
    employeeId?: string;

    /**
     * 顾客id    
     */
    customerId?: string;

    /**
     * 门店id     
     */
    shopId?: string;

    /**
     * 入店时间'yyyy-MM-dd HH:mm'                                    
     */
    enterDate?: Date;

    /**
     * 描述 
     */
    description?: string;

    /**
     * 费用合计
     */
    totalAmount?: number;

    supplies?: Array<models.Supply>;

    /**
     * 结账时间'yyyy-MM-dd'  
     */
    paidDate?: Date;

    /**
     * 技师 
     */
    employee?: string;

    /**
     * 客户评分              
     */
    score?: number;
}