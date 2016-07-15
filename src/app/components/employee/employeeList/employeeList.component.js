import template from './employeeList.html';
import controller from './employeeList.controller';
require("!style!css!sass!./employeeList.scss");

let employeeListComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default employeeListComponent;
