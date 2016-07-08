'use strict';
import * as models from './models';

export interface EmployeeRanking {
    

    /**
     * 技师id
     */
    id?: string;

    /**
     * 技师名称
     */
    name?: string;

    /**
     * 分数
     */
    score?: number;
}
