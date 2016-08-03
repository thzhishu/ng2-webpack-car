import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder, Control } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { UserApi, CommonApi, ReportApi } from 'client';
import { MainLogoComponent, PageFooterComponent, NavbarComponent, MenusComponent, SearchBarComponent,PaginationComponent } from 'common';

@Component({
	moduleId: module.id,
	selector: 'report-week-satisfaction',
	template: require('./satisfaction.html'),
	styles: [require('./satisfaction.scss')],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NavbarComponent, MenusComponent, SearchBarComponent, PageFooterComponent,PaginationComponent],
	providers: [HTTP_PROVIDERS, UserApi, CommonApi, Md5, ReportApi ]
})

export class ReportWeekSatisfactionComponent {
	start: string;
	end: string;
	percent: number = 0;
	shopGoods: string[] = [];
	shopBads: string[] = [];
	employeeGoods: any = [];
	employeeBads: any = [];
	improvements: any = [];
	page:any = {};
	constructor(private router: Router, fb: FormBuilder, private route: ActivatedRoute, private rApi: ReportApi) {
		this.end = moment().format('YYYY-MM-DD');
		this.start = (moment().subtract(7, 'days')).format('YYYY-MM-DD');
	}

	ngOnInit() {
		this.getWeekReport();
	}

	changePage(cur) {
    this.page.current = event;
    this.getWeekReport();
  }

	getWeekReport() {
		this.rApi.reportAttitudeGet(this.start, this.end).subscribe(data => {
			if(data.data ) {
				const dd = data.data;
				this.percent = dd.percent;
				this.shopGoods = dd.shopGoods;
				this.shopBads = dd.shopBads;
				this.employeeGoods = dd.employeeGoods;
				this.employeeBads = dd.employeeBads;
				this.improvements = dd.improvements;
				this.page.current = data.meta.current;
				this.page.limit = data.meta.limit;
				this.page.total = data.meta.total;
			}
		}, err => console.error(err) );
	}


}
