import template from './customerAdd.html';
import controller from './customerAdd.controller';
import './customerAdd.scss';

let customerAddComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default customerAddComponent;
