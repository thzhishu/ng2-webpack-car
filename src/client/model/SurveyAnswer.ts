'use strict';
import * as models from './models';

export interface SurveyAnswer {
    

    /**
     * 问题id
     */
    questionId?: string;

    /**
     * 问题分类
     */
    type?: string;

    answers?: Array<string>;
}
