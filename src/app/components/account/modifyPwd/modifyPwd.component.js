import template from './modifyPwd.html';
import controller from './modifyPwd.controller';
require("!style!css!sass!./modifyPwd.scss");

let modifyPwdComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default modifyPwdComponent;
