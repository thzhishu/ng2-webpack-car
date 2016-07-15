'use strict';
import * as models from './models';

export interface QuestionOption {
    

    /**
     * 选项id
     */
    id?: number;

    /**
     * 标题
     */
    title?: string;

    /**
     * 描述
     */
    description?: string;

    /**
     * 选项的分数
     */
    point?: number;

    /**
     * 默认值
     */
    defaultValue?: string;

    /**
     * 最小值
     */
    minValue?: string;

    /**
     * 最大值
     */
    maxValue?: string;
}
