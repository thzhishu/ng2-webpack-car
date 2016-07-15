'use strict';
import * as models from './models';

export interface User {
    

    /**
     * 用户uid 
     */
    id?: number;

    /**
     * 手机号 
     */
    mobile?: string;

    /**
     * 默认是手机号 
     */
    name?: string;

    /**
     * 用户登录凭证， 以后的每次请求，客户端务必将token置入httpheader 
     */
    token?: string;

    /**
     * 最近登录时间 
     */
    loginTime?: Date;

    /**
     * 上次用户选择的门店，如果第一次是null
     */
    lastShopId?: number;
}
