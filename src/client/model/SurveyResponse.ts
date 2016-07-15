'use strict';
import * as models from './models';

export interface SurveyResponse {
    

    meta?: models.Meta;

    data?: Array<models.Survey>;

    error?: models.Error;
}
