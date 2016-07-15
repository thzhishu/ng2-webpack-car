"use strict";
var core_1 = require('@angular/core');
var PROVIDERS = [];
if ('production' === ENV) {
    core_1.enableProdMode();
    PROVIDERS = PROVIDERS.slice();
}
else {
    PROVIDERS = PROVIDERS.slice();
}
exports.ENV_PROVIDERS = PROVIDERS.slice();
//# sourceMappingURL=environment.js.map