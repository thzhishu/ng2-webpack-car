'use strict';
import * as models from './models';

/**
 * 元数据，分页适用
 */
export interface Meta {
    

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
     * 当前页
     */
    current?: number;

    /**
     * 返回记录数据
     */
    total?: number;

    /**
     * 每页记录数，后端强制限制不超过1000
     */
    limit?: number;

    /**
     * 保存客户端状态
     */
    store?: any;
}
