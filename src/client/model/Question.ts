'use strict';
import * as models from './models';

export interface Question {
    

    /**
     * 问题id
     */
    id?: number;

    /**
     * 问题
     */
    title?: string;

    /**
     * 问题描述
     */
    description?: string;

    /**
     * 问题分类
     */
    type?: string;

    /**
     * 是否必答
     */
    required?: boolean;

    /**
     * 显示分项设置
     */
    showPoint?: string;

    /**
     * 问题选项
     */
    options?: Array<models.QuestionOption>;

    /**
     * 子问题
     */
    children?: Array<models.Question>;
}
