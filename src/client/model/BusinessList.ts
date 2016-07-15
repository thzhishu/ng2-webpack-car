'use strict';
import * as models from './models';

export interface BusinessList {
    

    /**
     * 总金额 
     */
    amount?: number;

    /**
     * 门店某一天的得分，界面修改 
     */
    score?: number;

    /**
     * 生意列表
     */
    content?: Array<models.BusinessListItem>;
}
