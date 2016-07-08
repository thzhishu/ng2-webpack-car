'use strict';
import * as models from './models';

/**
 * 登录之后返回用户信息
 */
export interface UserResponse {
    

    meta?: models.BasicMeta;

    data?: models.User;

    error?: models.Error;
}
