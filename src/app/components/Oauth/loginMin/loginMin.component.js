"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var common_1 = require('@angular/common');
var client_1 = require('client');
var LoginMinComponent = (function () {
    function LoginMinComponent(router, fb, params, ua) {
        this.router = router;
        this.ua = ua;
        this.loginForm = fb.group({
            'username': [''],
            'pwd': [''],
            'code': [''],
        });
        this.user = {};
    }
    LoginMinComponent.prototype.ngOnInit = function () {
        console.log(this.ua);
    };
    LoginMinComponent.prototype.toHome = function () {
        this.router.navigate(['/account/list']);
    };
    LoginMinComponent.prototype.goBack = function () {
        window.history.back();
    };
    LoginMinComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login-min',
            template: require('./loginMin.html'),
            styles: [require('./loginMin.scss')],
            directives: [router_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, client_1.UserApi],
        }), 
        __metadata('design:paramtypes', [router_1.Router, common_1.FormBuilder, router_1.RouteSegment, (typeof (_a = typeof client_1.UserApi !== 'undefined' && client_1.UserApi) === 'function' && _a) || Object])
    ], LoginMinComponent);
    return LoginMinComponent;
    var _a;
}());
exports.LoginMinComponent = LoginMinComponent;
//# sourceMappingURL=loginMin.component.js.map