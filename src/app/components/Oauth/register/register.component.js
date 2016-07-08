"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var common_1 = require('@angular/common');
var RegisterComponent = (function () {
    function RegisterComponent(router, params) {
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.toHome = function () {
        this.router.navigate(['']);
    };
    RegisterComponent.prototype.goBack = function () {
        window.history.back();
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'register',
            template: require('./register.html'),
            styles: [require('./register.scss')],
            directives: [router_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS],
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.RouteSegment])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map