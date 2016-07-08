'use strict';
import * as models from './models';

/**
 * 技师服务需要改进的地方
 */
export interface BusinessReportDetail {
    

    /**
     * 日期     
     */
    date?: string;

    /**
     * 服务项目 
     */
    serviceName?: string;

    /**
     * 技师id 
     */
    employeeId?: number;

    /**
     * 技师姓名
     */
    employeeName?: string;

    /**
     * 车型
     */
    model?: string;

    comments?: Array<models.Comment>;
}
