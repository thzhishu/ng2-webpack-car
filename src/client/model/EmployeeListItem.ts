'use strict';
import * as models from './models';

/**
 * 列表员工
 */
export interface EmployeeListItem {
    

    /**
     * 员工id
     */
    id?: string;

    /**
     * 姓名
     */
    name?: string;

    /**
     * 技师编号
     */
    code?: string;

    /**
     * 技师手机号
     */
    mobile?: string;

    /**
     * 服务次数
     */
    serviceTimes?: number;

    /**
     * 创建时间
     */
    createTime?: Date;

    /**
     * 修改时间
     */
    updateTime?: Date;
}
