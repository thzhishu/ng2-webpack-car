'use strict';
import * as models from './models';

/**
 * 员工返回结构
 */
export interface EmployeeResponse {
    

    meta?: models.Meta;

    data?: models.EmployeeListItem;

    error?: models.Error;
}
