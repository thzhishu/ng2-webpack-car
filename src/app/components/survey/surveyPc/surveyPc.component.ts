import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { SurveyApi } from 'client';
@Component({
    moduleId: module.id,
    selector: 'survey-pc',
    styles: [require('./surveyPc.scss')],
    template: require('./surveyPc.html'),
    directives: [ROUTER_DIRECTIVES],
    providers: [SurveyApi]
})

export class SurveyPcComponent {
    survey: any;
    constructor( private router: Router, private params: RouteSegment, private sApi: SurveyApi ) {

    }
    ngOnInit() {
        console.log(document);
        //this.createMeta();
        this.getSurveyQuestions();
    }

    createMeta() {
        let meta = document.querySelectorAll('meta[name="viewport"]')[0];
        meta.setAttribute('content', 'width=640, user-scalable=no, target-densitydpi=device-dpi');
    }

    getSurveyQuestions() {
        this.sApi.surveyLoadUrlGet('0LMUjj').subscribe(data => {
            console.log(data.data);
            console.log(JSON.parse(data.data));
        }, err => console.error(err));
    }

}
