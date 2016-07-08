'use strict';
import * as models from './models';

export interface AttitudeReportResponse {
    

    meta?: models.Meta;

    data?: Array<models.AttitudeReport>;

    error?: models.Error;
}
