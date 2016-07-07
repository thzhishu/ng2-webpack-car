import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HTTP_PROVIDERS }  from '@angular/http';
import 'rxjs/Rx';

import { RewardType, RewardTypeService } from './RewardType.service';

@Component({
  moduleId:module.id,
    selector: 'create',
    template: require('./template.html'),
    styles: [ require('./style.css') ],
    directives: [ROUTER_DIRECTIVES],
    providers: [RewardTypeService, HTTP_PROVIDERS],
})

export class CreateComponent {
    list: RewardType[];
    type: number;
    loading: number;

    constructor(private rt: RewardTypeService, private router: Router) {
      this.type = 1;
    }

    ngOnInit() { this.getList(); }

    getList() {
        this.list = [
                {"type":1,"name": "展示型优惠券","ico": "type-ico-show", "status":1, "isChecked":true},
                {"type":2,"name": "核验型优惠码","ico": "type-ico-pin", "status":1, "isChecked":false},
                {"type":3,"name": "大转盘","ico": "type-ico-baccarat", "status":1, "isChecked":false},
                {"type":4,"name": "手机话费","ico": "type-ico-phone", "status":0, "isChecked":false},
                {"type":5,"name": "天会宝","ico": "type-ico-tian", "status":0, "isChecked":false},
                {"type":6,"name": "万里通积分","ico": "type-ico-wan", "status":0, "isChecked":false},
                {"type":7,"name": "线下实物寄送","ico": "type-ico-outline", "status":0, "isChecked":false},
                {"type":8,"name": "集分宝","ico": "type-ico-score", "status":0, "isChecked":false}
                ];

        // this.rt.getRewardtypes().subscribe(
        //     heroes => this.list = heroes ,
        //     error => this.handleError);
    }

    onSelect(item: RewardType) {
        if (item.status === 0) return;
        this.type = item.type;
        this.rt.updateChecked(item.type, this.list);
    }

    routerUrl(type: number) {
        let router;
        switch (type) {
            case 1: router = '/show/add';
                break;
            case 2: router = '/pin/add';
                break;
            case 3: router = '/baccarat/add';
                break;
            case 4: router = '/';
                break;
            case 5: router = '/';
                break;
            case 6: router = '/';
                break;
            case 7: router = '/';
                break;
            case 8: router = '/';
                break;
            default:
                router = '/create';
        }
        this.router.navigate([router]);
    }

    redirectTo() {
        this.list.map(data => { if (data.isChecked) { this.routerUrl(data.type); } });
    }

    private handleError(error: any) {
        this.loading = 0;
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    goBack() {
        window.history.back();
    }

}
