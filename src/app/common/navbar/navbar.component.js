import template from './navbar.html';
import controller from './navbar.controller';
require("!style!css!sass!./navbar.scss");

let navbarComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default navbarComponent;
