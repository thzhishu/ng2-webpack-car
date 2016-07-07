import template from './customerList.html';
import controller from './customerList.controller';
import './customerList.scss';

let customerListComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default customerListComponent;
