'use strict';
import * as models from './models';

export interface MyAcountResponse {
    

    meta?: models.BasicMeta;

    data?: models.AcountInfo;

    error?: models.Error;
}
