'use strict';
import * as models from './models';

export interface Survey {
    

    /**
     * 问卷id， 创建为空
     */
    id?: number;

    /**
     * 问卷名称
     */
    title?: string;

    /**
     * 问卷副标题
     */
    subtitle?: string;

    /**
     * 问卷描述
     */
    description?: string;

    /**
     * 问卷类型1.快修快保 2.综合维修 3.美容改装 4.轮胎专项 5.其他 6.通用
     */
    type?: string;

    /**
     * 问卷开始时间， 如果没有，留空
     */
    start?: Date;

    /**
     * 问卷结束时间， 如果没有， 留空
     */
    end?: Date;

    pages?: Array<models.Page>;
}
