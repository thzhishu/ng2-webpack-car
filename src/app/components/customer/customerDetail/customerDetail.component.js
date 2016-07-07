import template from './customerDetail.html';
import controller from './customerDetail.controller';
require("!style!css!sass!./customerDetail.scss");

let customerDetailComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default customerDetailComponent;
