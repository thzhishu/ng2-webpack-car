import { Component, Input, Output, NgZone } from '@angular/core';
import { COMMON_DIRECTIVES, NgSwitch, NgSwitchDefault } from '@angular/common';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

import { SurveyApi, SurveySubmitRequest } from 'client';
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
    surveyQustions: Array<any> = [];
    surveySubmitObj = {
        sampleId: undefined,
        isComplete: false,
        answers: []
    };
    // surveySubmitObj: SurveySubmitRequest;
    answersObj = {};
    // 1 为显示问卷， 2 为问卷答完保存成功 3为已经答过了或没有url
    showSurvey: number = 0;
    currentPage: number = 0;
    waitingPage: number = 0;
    tempPageAnswers = [];
    constructor( private router: Router, private route: ActivatedRoute, private sApi: SurveyApi ) {
    }
    ngOnInit() {
        this.createMeta();
        // 获取 url
        this.sub = this.route.params.subscribe(params => {
            this.url = params['url'];
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
            if (data.meta.code !== 200) {
                this.showLastCreen(3);
                return;
            }
            if (data && data.data) {
                this.survey = JSON.parse(data.data);
                this.surveyQustions = this.survey.pages.length ? this.survey.pages[0].questions : [];
                this.surveyQustions = this.formatSurveyQestions(_.cloneDeep(this.surveyQustions));
                this.showFirstCreen();
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
       
       
        
        this.surveySubmitObj.isComplete = true;
        this.surveySubmitObj.sampleId = this.surveySubmitObj.sampleId || null;
        this.sApi.surveyUrlSubmitPost(this.url, this.surveySubmitObj).subscribe(data => {
            if (data.meta.code === 200 && data.data) {
                this.showLastCreen(2);
            } else {
                this.showLastCreen(3);
            }
        }, err => console.error(err));
    }
    


    // 去某一屏
    goto(page) {
        this.currentPage = page;
        setTimeout(() => {
            this.waitingPage = page;
        }, 800);
    }

    gotoNext(page) {
        let valid = true;
        if (page !== 100) {
            switch (page) {
                case 2:
                case 3:
                case 4:
                    // 验证第一题 验证第二题 验证第三题
                    valid = this.scoreMultiValid(this.surveyQustions[page - 2], page - 2);
                    break;
                case 5:
                    // 验证第四题
                    valid = this.questionGroupValid([3]);
                    break;
                case 6:
                    // 验证第五题 验证第六题 验证第七题
                    valid = this.questionGroupValid([4, 5, 6]);
                    break;
                case 7:
                    // 验证第八题 验证第九题 验证第十题
                    valid = this.questionGroupValid([7, 8, 9]);
                    break;
                case 8:
                    // 验证第十一题
                    valid = this.questionGroupValid([10]);
                    break;
                case 100:
                    // 验证第十二题
                    valid = this.questionGroupValid([11]);
                    break;
                default:
                    console.log(page);
            }
            if (valid) {
                this.goto(page);
            }
        } else {
            // 验证第十二题
            valid = this.questionGroupValid([11]);
            if (valid) {
                console.log(this.surveySubmitObj);
                this.onSave();
            }
        }
            
    }

    // 多项评分题验证
    scoreMultiValid(q, idx) {
        let tempArr = [];
        for (let i = 0, len = q.answer.length; i < len; i++) {
            if ( q.answer[i] === undefined ) {
                // 第 i 个子题没选
                q.children[i].hasErr = true;
                alert(`第${idx + 1}题的"${q.children[i].title}"还未评价`);
                return false;
            } else {
                tempArr.push(q.answer[i]);
            }
        }
        this.surveySubmitObj.answers = this.surveySubmitObj.answers.concat(tempArr);
        return true;
    }
    // 常规问题验证
    questionValid (q, idx) {
        if (q.answer === '') {
            q.hasErr = true;
            alert(`第${idx + 1}题还未回答`);
            return false;
        } else {
            this.tempPageAnswers.push({
                questionId: q.id,
                type: q.type,
                answers: [q.answer]
            });
            return true;
        }
    }

    // 每页问题组验证
    questionGroupValid (idxArr) {
        this.tempPageAnswers = [];
        for (const idx of idxArr) {
            if (!this.questionValid(this.surveyQustions[idx], idx)) {
                return false;
            }
        }
        this.surveySubmitObj.answers = this.surveySubmitObj.answers.concat(this.tempPageAnswers);
        return true;
    }
    

}
