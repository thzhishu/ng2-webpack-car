"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
exports.APPLICATION_DIRECTIVES = router_1.ROUTER_DIRECTIVES.slice();
exports.DIRECTIVES = [
    { provide: core_1.PLATFORM_DIRECTIVES, multi: true, useValue: exports.APPLICATION_DIRECTIVES }
];
//# sourceMappingURL=directives.js.map