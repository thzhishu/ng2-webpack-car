'use strict';
import * as models from './models';

/**
 * 服务项目(交易/生意)
 */
export interface BusinessDetail {
    

    /**
     * id    
     */
    id?: number;

    /**
     * 车牌号,2016-07-12修改                 
     */
    vehicleLicence?: string;

    /**
     * 服务项目 
     */
    name?: string;

    /**
     * 技师id     
     */
    employeeId?: number;

    /**
     * 顾客id    
     */
    customerId?: number;

    /**
     * 门店id    
     */
    shopId?: number;

    /**
     * 入店时间'yyyy-MM-dd HH:mm'                                    
     */
    enterDate?: Date;

    /**
     * 描述 
     */
    description?: string;

    /**
     * 费用合计，服务端要自己计算
     */
    totalAmount?: number;

    supplies?: Array<models.Supply>;
}
