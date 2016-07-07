import template from './myAccount.html';
import controller from './myAccount.controller';
require("!style!css!sass!./myAccount.scss");

let myAccountComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default myAccountComponent;
