'use strict';
import * as models from './models';

export interface Comment {
    

    /**
     * 服务项
     */
    item?: string;

    /**
     * 服务得分
     */
    score?: number;
}
