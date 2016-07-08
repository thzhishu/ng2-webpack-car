'use strict';
import * as models from './models';

export interface Shop {
    

    /**
     * 用户uid 
     */
    id?: string;

    /**
     * 门店名称
     */
    name?: string;

    /**
     * 省
     */
    provinceId?: string;

    /**
     * 市
     */
    cityId?: string;

    /**
     * 区
     */
    districtId?: string;

    /**
     * 地址
     */
    address?: string;

    /**
     * 服务类型，用逗号分隔
     */
    serviceIds?: string;

    /**
     * 联系人
     */
    ownerName?: string;

    /**
     * 联系方式
     */
    phone?: string;

    /**
     * 开店日期
     */
    openingDate?: Date;

    /**
     * 工位
     */
    station?: number;

    /**
     * 门店面积
     */
    area?: number;

    /**
     * 创建时间     
     */
    createTime?: Date;

    /**
     * 更新时间                  
     */
    updateTime?: Date;
}
