'use strict';
import * as models from './models';

/**
 * 常规成功是失败，data为空，只看meta和error
 */
export interface CommonResponse {
    

    meta?: models.BasicMeta;

    error?: models.Error;
}
