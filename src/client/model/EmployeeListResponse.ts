'use strict';
import * as models from './models';

/**
 * 员工列表返回结构
 */
export interface EmployeeListResponse {
    

    meta?: models.Meta;

    data?: Array<models.EmployeeListItem>;

    error?: models.Error;
}
