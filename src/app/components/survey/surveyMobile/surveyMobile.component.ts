import { Component, Input, Output, NgZone } from '@angular/core';
import { COMMON_DIRECTIVES, NgSwitch, NgSwitchDefault } from '@angular/common';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

import { SurveyApi } from 'client';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'survey-mobile',
    styles: [require('./surveyMobile.scss')],
    template: require('./surveyMobile.html'),
    directives: [ROUTER_DIRECTIVES, COMMON_DIRECTIVES, NgSwitch, NgSwitchDefault],
    providers: [SurveyApi]
})

export class SurveyMobileComponent {
    sub: any;
    url: string = '';
    survey: any;
    surveyQustions: Array<Object> = [];
    surveySubmitObj = {
        sampleId: null,
        isComplete: false,
        answers: []
    };
    answersObj = {};
    // 1 为显示问卷， 2 为问卷答完保存成功 3为已经答过了或没有url
    showSurvey: number = 1;
    currentPage: number = 0;
    waitingPage: number = 0;
    questionAnswers = {
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
        q6: '',
        q7: '',
        q8: '',
        q9: '',
        q10: '',
        q11: '',
        q12: ''
    };
    constructor( private router: Router, private route: ActivatedRoute, private sApi: SurveyApi ) {

    }
    ngOnInit() {
        this.createMeta();
        // 获取 url
        this.sub = this.route.params.subscribe(params => {
            console.log(params);
            this.url = params.url;
            if (this.url) {
                
                this.getSurveyQuestions();
            } else {
                this.showLastCreen(3);
            }
        });
    }

    // 显示最后一屏
    showLastCreen(status) {
        this.showSurvey = status;
        this.currentPage = 100;
        this.waitingPage = 100;
    }

    // 显示问卷首页 
    showFirstCreen() {
        this.showSurvey = 1;
        this.currentPage = 0;
        this.waitingPage = 0;
    }
    // 添加 viewport = 640
    createMeta() {
        let meta = document.querySelectorAll('meta[name="viewport"]')[0];
        meta.setAttribute('content', 'width=640, user-scalable=no, target-densitydpi=device-dpi');
    }

    // 获取问卷
    getSurveyQuestions() {
        this.sApi.surveyLoadUrlGet(this.url).subscribe(data => {
            if (data && data.data) {
                this.survey = JSON.parse(data.data);
                this.surveyQustions = this.survey.pages.length ? this.survey.pages[0].questions : [];
                this.surveyQustions = this.formatSurveyQestions(this.surveyQustions);
                this.showFirstCreen();
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


    // 去某一屏
    goto(page) {
        let valid = true;
        switch (page) {
            case 1:

                break;
            case 2:
                break;
            default:
                console.log(page);
        }
        if (valid) {
            this.currentPage = page;
            setTimeout(() => {
                this.waitingPage = page;
            }, 1000);
        }
            
    }

    

}
