'use strict';
import * as models from './models';

export interface BehaviorReportResponse {
    

    meta?: models.Meta;

    data?: Array<models.BehaviorReport>;

    error?: models.Error;
}
