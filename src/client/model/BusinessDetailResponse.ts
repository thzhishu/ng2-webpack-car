'use strict';
import * as models from './models';

/**
 * 生意列表
 */
export interface BusinessDetailResponse {
    

    meta?: models.Meta;

    data?: models.BusinessDetail;

    error?: models.Error;
}
