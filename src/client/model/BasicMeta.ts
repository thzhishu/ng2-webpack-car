'use strict';
import * as models from './models';

/**
 * 元数据，非分页适用
 */
export interface BasicMeta {
    

    /**
     * 状态码，通过此码确定操作是否成功， 如果成功读取data，如果失败，读取error的code和message
     */
    code?: number;

    /**
     * 调用的远程java方法
     */
    method?: string;

    /**
     * 调用的远程api url
     */
    link?: string;

    /**
     * 本次api调用的queryString
     */
    parameters?: any;

    /**
     * 保存客户端状态
     */
    store?: any;
}
