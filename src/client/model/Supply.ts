'use strict';
import * as models from './models';

/**
 * 材料
 */
export interface Supply {
    

    /**
     * id   
     */
    id?: string;

    /**
     * 材料                                                    
     */
    name?: string;

    /**
     * 数量  
     */
    volume?: number;

    /**
     * 材料费用  
     */
    cost?: number;

    /**
     * 工时  
     */
    manHours?: number;

    /**
     * 维护费用                                                                   
     */
    maintanenceCost?: number;
}
