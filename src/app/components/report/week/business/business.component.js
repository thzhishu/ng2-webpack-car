import template from './business.html';
import controller from './business.controller';
require("!style!css!sass!./business.scss");

let businessComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default businessComponent;
