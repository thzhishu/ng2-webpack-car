'use strict';
import * as models from './models';

/**
 * 问卷一页
 */
export interface Page {
    

    questions?: Array<models.Question>;
}
