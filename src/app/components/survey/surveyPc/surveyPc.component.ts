import { Component, Input, Output, NgZone } from '@angular/core';
import { COMMON_DIRECTIVES, NgSwitch, NgSwitchDefault } from '@angular/common';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

import { SurveyApi } from 'client';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'survey-pc',
    styles: [require('./surveyPc.scss')],
    template: require('./surveyPc.html'),
    directives: [ROUTER_DIRECTIVES, COMMON_DIRECTIVES, NgSwitch, NgSwitchDefault],
    providers: [SurveyApi]
})

export class SurveyPcComponent {
    survey: any;
    surveyQustions: Array<Object> = [];
    surveySubmitObj = {
        sampleId: null,
        isComplete: false,
        answers: []
    };
    answersObj = {};
    constructor( private router: Router, private route: ActivatedRoute, private sApi: SurveyApi ) {

    }
    ngOnInit() {
        console.log(document);

        // this.createMeta();
        this.getSurveyQuestions();
    }

    createMeta() {
        let meta = document.querySelectorAll('meta[name="viewport"]')[0];
        meta.setAttribute('content', 'width=640, user-scalable=no, target-densitydpi=device-dpi');
    }

    getSurveyQuestions() {
        this.sApi.surveyLoadUrlGet('0LMUjj').subscribe(data => {
            if (data && data.data) {
                this.survey = JSON.parse(data.data);
                this.surveyQustions = this.survey.pages.length ? this.survey.pages[0].questions : [];
                this.surveyQustions = this.formatSurveyQestions(this.surveyQustions);
                console.log(this.surveyQustions);
                console.log(this.survey);
            }

        }, err => console.error(err));
    }

    formatSurveyQestions(qs) {
        for ( let q of qs ) {
            q.answer = '';
            q.hasErr = false;
            if ( q.type === 'score' && q.options.length > 0 ) {
                q.tempPoint = -1;
                this.formatScoreQuestion(q);
            }
            if ( q.type === 'score_multi' && q.children.length > 0 ) {
                q.answer = Array(q.children.length);
                for ( let cq of q.children ) {
                    cq.answer = '';
                    cq.tempPoint = -1;
                    cq.hasErr = false;
                    this.formatScoreQuestion(cq);
                }
            }
            if ( q.type === 'radio' && q.options.length > 0 ) {
                for ( let rq of q.options ) {
                    rq.eid = 'svq-' + q.id + '-' + rq.id;
                }
            }

        }
        return qs;
    }
    formatScoreQuestion(q) {
        let len = q.options.length;
        if ( len > 0 ) {
            if ( q.options[len - 1].point === 99 ) {
                q.zeroOption = q.options[len - 1];
                q.options.pop();
            }
        }
    }

    // 处理多项评分题
    onMscore(q, subq, subidx, ans) {
        let id = 'q_' + q.id + '_' + subq.id;
        console.log(id);
        subq.hasErr = false;
        subq.answer = ans.id;
        subq.tempPoint = ans.point === 99 ? 0 : ans.point;
        
        q.answer[subidx] = {
            questionId: subq.id,
            type: subq.type,
            answers: [ans.id]
        };
        
       
        
    }
    // 处理评分题
    onScore(q, ans) {
        let id = 'q_' + q.id;
        q.answer = ans.id;
        q.tempPoint = ans.point === 99 ? 0 : ans.point;
        q.hasErr = false;
        
    }
    // 处理性别题
    onSex(q, ans) {
        let id = 'q_' + q.id;
        q.answer = ans.id;
        
    }

    onSave() {
        console.log(this.surveyQustions);
        this.surveySubmitObj.answers = [];
        for (const idx = 0, len = this.surveyQustions.length; idx < len; idx++ ) {
            let q = this.surveyQustions[idx];
            switch (q.type) {
                case 'score_multi':
                    for (let i = 0, len = q.answer.length; i < len; i++) {
                        if ( q.answer[i] === undefined ) {
                            // 第 i 个子题没选
                            q.children[i].hasErr = true;
                            alert(`第${idx + 1}题的"${q.children[i].title}"还未评价`);
                            return false;
                        } else {
                            this.surveySubmitObj.answers.push(q.answer[i]);
                        }
                        
                    }
                    break;
                default:
                    if (q.answer === '') {
                        q.hasErr = true;
                        alert(`第${idx + 1}题还未回答`);
                        return false;
                    } else {
                        this.surveySubmitObj.answers.push({
                            questionId: q.id,
                            type: q.type,
                            answers: [q.answer]
                        });
                    }
                        
            }
        }
        console.log(this.surveySubmitObj);
        this.surveySubmitObj.isComplete = true;
        this.sApi.surveyUrlSubmitPost('0LMUjj', this.surveySubmitObj).subscribe(data => {
            console.log(data);
        }, err => console.error(err));
    }
    // 提交前验证
    validateSurvey() {
        let ret = true;
        for(let q of this.surveyQustions) {

        }
    }

    

}
