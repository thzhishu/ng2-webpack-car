import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Jsonp, URLSearchParams, JSONP_PROVIDERS } from '@angular/http';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder } from '@angular/common';
import * as moment from 'moment';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';
import { PAGINATION_DIRECTIVES, DATEPICKER_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { baseUrl, Validators } from '../../services';
import { PinProgram, PinService } from '../Pin.service';
import { TextTohtmlPipe } from '../../pipe';

const URL = baseUrl + '/medias/uploadBackgroundImage';

const FILE_URL = baseUrl + '/rewardManage/uploadCheckCode';


@Component({
    moduleId: module.id,
    selector: 'pin-add',
    template: require('./template.html'),
    styles: [require('./style.css'), require('assets/css/md.scss')],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, UPLOAD_DIRECTIVES, DATEPICKER_DIRECTIVES],
    providers: [PinService, HTTP_PROVIDERS, JSONP_PROVIDERS],
    pipes: [TextTohtmlPipe],
    host: {
        '(click)': 'closeDatePicker($event)'
    }
})

export class PinAddComponent {
    zone: NgZone;
    psForm: ControlGroup;
    erForm: ControlGroup;
    pinProgram: any;
    errorMessage: any;
    totalRewards: any;
    additionalNumControl: any;
    id: number;
    loading: number;
    additionalNum: number;

    options: Object = {
        url: URL
    };
    basicProgress: number = 0;
    basicResp: Object;
    uploadFile: any;

    fileOptions: Object = {
        url: FILE_URL
    };
    fileProgress: number = 0;
    fileResp: Object;

    uploadFileXls: any;

    dateShow: any = 0;
    additionalNumError: any = 0;
    cRPRateContent: any = 0;
    timeError: any = 0;
    file: any;
    image: any;
    state: number = 0;
    expireRemindShow: any = 0;
    expireRemind: any;

    constructor(private ps: PinService, private router: Router, fb: FormBuilder, params: RouteSegment) {
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.id = +params.getParam('id');
        this.state = +params.getParam('state'); //获取URL中的状态
        this.psForm = fb.group({
            'cRPName': ['', Validators.required],
            'cRPRewardType': [2],
            'cRPSubtitle': [''],
            'cRPNameShow': [1],
            'cRPSubtitleShow': [0],
            'cRPBackgroundAdd': [''],
            'cRPBackgroundShow': [0],
            'cRPDesc': [''],
            'cRPDescShow': [0],
            'cRPValidType': [-1],
            'cRPRate': [1],
            'cRPRateContent': ['', Validators.ratio],
            'totalRewards': [''],
            'additionalNumControl': [''],
            'cRPCodeType': [1],
            'cRPCodeCommon': [''],
            'cRPGenerateType': [1],
            'fileName': [''],
            'cRPNoticeNow': [1],
            'cRPNoticeNowContent': ['奖励领取验证码{验证码}，恭喜您获得由{品牌名}提供的{奖品名称}一份，有效期{生效日期}至{失效日期}。'],
            'cRPValidNotice': [1],
            'cRPValidNoticeDay': [3],
            'cRPValidNoticeContent': ['奖励领取验证码{验证码}，您获得的由{品牌名}提供的{奖品名称}将在{失效日}到期，请及时兑换。'],
        });
        this.erForm = fb.group({
            'cRPWarnStock': [''],
            'cRPEmail': [''],
            'cRPMobile': [''],
        });

        this.totalRewards = this.psForm.controls['totalRewards'];
        this.additionalNumControl = this.psForm.controls['additionalNumControl'];
        this.cRPRateContent = this.psForm.controls['cRPRateContent'];
        this.pinProgram = {};
        this.pinProgram.cRPName = '';
        this.pinProgram.cRPSubtitle = '';
        this.pinProgram.cRPNameShow = 1;
        this.pinProgram.cRPSubtitleShow = 0;
        this.pinProgram.cRPBackgroundAdd = '';
        this.pinProgram.cRPBackgroundShow = 0;
        this.pinProgram.cRPDesc = '';
        this.pinProgram.cRPDescShow = 0;
        this.pinProgram.cRPValidType = -1;
        this.pinProgram.cRPRate = 1;
        this.pinProgram.cRPRateContent = null;
        this.pinProgram.totalRewards = null;
        this.pinProgram.cRPCodeType = 1;
        this.pinProgram.cRPCodeCommon = '';
        this.pinProgram.cRPGenerateType = 1;
        this.pinProgram.cRPNoticeNow = 1;
        this.pinProgram.cRPNoticeNowContent = '奖励领取验证码{验证码}，恭喜您获得由{品牌名}提供的{奖品名称}一份，有效期{生效日期}至{失效日期}。';
        this.pinProgram.cRPValidNotice = 1;
        this.pinProgram.cRPValidNoticeDay = 3;
        this.pinProgram.cRPValidNoticeContent = '奖励领取验证码{验证码}，您获得的由{品牌名}提供的{奖品名称}将在{失效日}到期，请及时兑换。';
        this.pinProgram.cRPValidStartDate = moment().format('YYYY-MM-DD');
        this.pinProgram.cRPValidEndDate = moment().format('YYYY-MM-DD');
    }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.getPinProgram();
    }

    onNumberPipe($event) {
        if (isNaN(+$event.target.value)) {
            $event.target.value = 1;
        } else if (+$event.target.value < 1) {
            $event.target.value = 1;
        } else if (+$event.target.value > 8) {
            $event.target.value = 9;
        }
    }

    onExpireRemind() {
        this.expireRemindShow = 1;
        this.expireRemind = Object.assign({}, this.pinProgram);
    }

    onSubmitExpireRemind() {
        if (!this.erForm.valid) {
            this.erForm.markAsTouched();
            return false;
        }
        this.expireRemindShow = 0;
        this.pinProgram.cRPWarnStock = this.expireRemind.cRPWarnStock;
        this.pinProgram.cRPMessageWarn = this.expireRemind.cRPMessageWarn;
        this.pinProgram.cRPSystemWarn = this.expireRemind.cRPSystemWarn;
        this.pinProgram.cRPEmailWarn = this.expireRemind.cRPEmailWarn;
        this.pinProgram.cRPEmail = this.expireRemind.cRPEmail;
        this.pinProgram.cRPMobile = this.expireRemind.cRPMobile;
    }

    onClose() {
        this.expireRemindShow = 0;
    }


    onShowDate(event) {
        event.stopPropagation();
        this.dateShow = !this.dateShow;
    }

    onInitDate() {
        this.pinProgram.cRPValidStartDate = moment().format('YYYY-MM-DD');
        this.pinProgram.cRPValidEndDate = moment().format('YYYY-MM-DD');
    }

    public closeDatePicker(event) {
        event.stopPropagation();
        this.dateShow = 0;
    }

    moment(date) {
        if (date == null) return '';
        return moment(date).format('YYYY-MM-DD');
    }

    momentDate(date): Date {
        return moment(date).toDate();
    }



    getPinProgram() {
        if (this.id === undefined || isNaN(this.id)) return;
        this.ps.getOne(this.id).subscribe(data => this.setPsForm(data));
    }

    setPsForm(data) {
        this.pinProgram = data.data;
        this.pinProgram.cRPValidStartDate = this.moment(this.pinProgram.cRPValidStartDate);
        this.pinProgram.cRPValidEndDate = this.moment(this.pinProgram.cRPValidEndDate);
        if (this.pinProgram.cRPDesc != null) {
            this.pinProgram.cRPDesc = this.pinProgram.cRPDesc.replace(/<br\/>/g, '\n');
        }
        if (this.pinProgram.cRPBackgroundAdd == '' || this.pinProgram.cRPBackgroundAdd == null) {

        } else {
            this.uploadFile = {};
            this.uploadFile.data = this.pinProgram.cRPBackgroundAdd;
        }
    }

    handleUpload(data): void {
        if (data.size > 2 * 1024 * 1024) {
            this.uploadFile = { error: { state: 2, msg: '图片文件尺寸请小于2M' } };
        } else {
            if (data.response) {
                this.uploadFile = JSON.parse(data.response);
                this.pinProgram.cRPBackgroundAdd = this.uploadFile.data;
                this.basicResp = data;
            }
            this.zone.run(() => {
                this.basicProgress = data.progress.percent;
            });
        }
    }

    handleFileUpload(data): void {
        // console.log(data)
        // if (data.size > 2 * 1024 * 1024) {
        //     this.uploadFileXls = { error: { state: 2, msg: '文件不大于2M' } };
        // } else {
            if (data.response) {
                this.uploadFileXls = JSON.parse(data.response);
                if (this.uploadFileXls.error.state === 0) {
                    this.pinProgram.fileName = this.uploadFileXls.data.filePath;
                }
                this.fileResp = data;
                this.fileProgress = 0;
            }
            this.zone.run(() => {
                this.fileProgress = data.progress.percent;
            });
       // }
    }

    onDelFileName() {
        this.pinProgram.fileName = '';
        this.fileProgress = 0;
        this.uploadFileXls = null;
    }

    onDelImg() {
        this.pinProgram.cRPBackgroundAdd = '';
        this.basicProgress = 0;
        this.uploadFile = null;
    }

    getImg() {
        if (this.pinProgram.cRPBackgroundAdd && this.pinProgram.cRPBackgroundShow) {
            return { 'background': 'url(\'' + baseUrl + '/' + this.pinProgram.cRPBackgroundAdd + '\') no-repeat center center / cover', 'background-size': 'cover' };
        }
    }

    onAddTotal() {
        if (this.loading) {
            return false;
        }
        if (this.checkTotal(this.additionalNum)) {
            this.loading = 0;
            return false;
        }
        this.loading = 1;
        let data: any = {};
        data.cRPId = this.pinProgram.cRPId;
        data.cRPDId = this.pinProgram.subInfo[0].cRPDId;
        data.fileName = this.pinProgram.fileName;
        data.additionalNum = +this.additionalNum;
        this.ps.addTotal(data).subscribe(data => {
            this.loading = 0;
            if (data.error.state !== 0) {
                alert(data.error.msg);
                return;
            }
            alert('新增成功');
            this.pinProgram.totalRewards += +this.additionalNum;
            this.additionalNum = null;
            // TimerWrapper.setTimeout(() => {
            //   tl.addStatus = 0;
            //   this.getTotalList();
            // }, 5000);
        }, error => this.handleError);
    }
    onEnterAddTotal(event) {
        event.stopPropagation();
        if (event.keyCode == 13) {
            this.onAddTotal();
        }
    }

    checkTotal(additionalNum) {
        if (additionalNum === '') {
            this.additionalNumError = 1;
            return true;
        }
        if (!/^([1-9][0-9]{0,4}|100000)$/.test(additionalNum)) {
            this.additionalNumError = 1;
            return true;
        }
        this.additionalNumError = 0;
        return false;
    }



    before(start, end) {
        return moment(start).isBefore(end);
    }
    totalRewardsError: number = 0;
    onSubmit() {
        if (!this.psForm.valid) {
            this.psForm.markAsTouched();
            return false;
        }
        let data = Object.assign({}, this.pinProgram);
        if (this.before(data.cRPValidEndDate, data.cRPValidStartDate)) {
            this.timeError = 1;
            return false;
        } else {
            this.timeError = 0;
        }
        if (data.cRPGenerateType == 1 && data.totalRewards == null) {
            this.totalRewardsError = 1;
            return false
        } else {
            this.totalRewardsError = 0;
        }
        if (this.loading) {
            return false;
        }
        this.loading = 1;
        if (data.cRPDesc != null) {
            data.cRPDesc = data.cRPDesc.replace(/[\n]/g, '<br/>');
        }
        this.ps.add(data).subscribe(res => {
            this.loading = 0;
            if (res.error.state !== 0) {
                alert(res.error.msg);
                return;
            }

            alert('成功');
            this.toHome();
        },
            error => { this.errorMessage = <any>error; alert(error); this.loading = 0; });
    }
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    toHome() {
        this.router.navigate(['/']);
    }
    goBack() {
        window.history.back();
    }
}
