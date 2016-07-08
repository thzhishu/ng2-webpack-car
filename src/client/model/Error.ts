'use strict';
import * as models from './models';

export interface Error {
    

    /**
     * 错误码
     */
    code?: number;

    /**
     * 错误描述
     */
    message?: string;
}
