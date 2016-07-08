'use strict';
import * as models from './models';

export interface MyShopResponse {
    

    meta?: models.Meta;

    data?: Array<models.Shop>;

    error?: models.Error;
}
