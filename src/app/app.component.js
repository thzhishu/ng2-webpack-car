"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var components_1 = require('./components');
var moment = require('moment');
var AppComponent = (function () {
    function AppComponent(router) {
        this.router = router;
    }
    AppComponent.prototype.ngOnInit = function () {
        moment.locale('zh-cn');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'car-app',
            template: '<router-outlet></router-outlet>',
            styles: [require('../assets/css/app.scss')],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [router_1.ROUTER_PROVIDERS]
        }),
        router_1.Routes([
            { path: '/login-min', component: components_1.LoginMinComponent },
            { path: '/register', component: components_1.RegisterComponent },
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map