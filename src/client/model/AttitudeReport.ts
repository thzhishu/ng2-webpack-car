'use strict';
import * as models from './models';

export interface AttitudeReport {
    

    percent?: number;

    /**
     * 做的良好的地方
     */
    shopGoods?: Array<string>;

    /**
     * 需要改进的地方
     */
    shopBads?: Array<string>;

    /**
     * 提供了优质服务的技师
     */
    employeeGoods?: Array<models.EmployeeRanking>;

    /**
     * 服务需提升的技师
     */
    employeeBads?: Array<models.EmployeeRanking>;

    /**
     * 技师服务需要改进的地方
     */
    improvements?: Array<models.BusinessReportDetail>;
}
