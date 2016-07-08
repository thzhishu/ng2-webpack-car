'use strict';
import * as models from './models';

/**
 * 用户修改密码的凭证uuid， 服务端设置timeout时间 
 */
export interface SecurityToken {
    

    /**
     * 验证码正确之后，用户修改密码，必须带次凭证               
     */
    sign?: string;
}
