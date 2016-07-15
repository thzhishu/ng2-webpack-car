'use strict';
import * as models from './models';

export interface SurveySubmitResponse {
    

    meta?: models.Meta;

    /**
     * 结构下个阶段定义，如果客户端不做逻辑，需要返回下一页显示或者隐藏的题目
     */
    data?: any;

    error?: models.Error;
}
