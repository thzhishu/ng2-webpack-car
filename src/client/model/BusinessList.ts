'use strict';
import * as models from './models';

export interface BusinessList {
    

    /**
     * 总金额 
     */
    amount?: number;

    /**
     * 生意列表
     */
    content?: Array<models.BusinessListItem>;
}
