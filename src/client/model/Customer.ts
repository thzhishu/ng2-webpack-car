'use strict';
import * as models from './models';

export interface Customer {
    

    /**
     * 顾客id
     */
    id?: number;

    /**
     * 车牌号
     */
    vehicleLicence?: string;

    /**
     * 手机号
     */
    mobile?: string;

    /**
     * 车架号
     */
    vehicleFrame?: string;

    /**
     * 客户姓名
     */
    name?: string;

    /**
     * 出生年份
     */
    birthYear?: number;

    /**
     * 性别,0女，1男， 2其他
     */
    gender?: number;

    /**
     * 车品牌
     */
    vehicleBrand?: string;

    /**
     * 车型号
     */
    vehicleModel?: string;

    /**
     * 购买年份
     */
    vehicleYear?: number;

    /**
     * 行驶里程
     */
    vehicleMiles?: number;

    /**
     * 最后入店时间        
     */
    lastEnterDate?: Date;
}
