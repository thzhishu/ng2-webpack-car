import template from './menus.html';
import controller from './menus.controller';
import './menus.scss';

let menusComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default menusComponent;
