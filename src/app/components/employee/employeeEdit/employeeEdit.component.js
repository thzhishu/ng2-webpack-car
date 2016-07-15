import template from './employeeEdit.html';
import controller from './employeeEdit.controller';
import './employeeEdit.scss';

let employeeEditComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default employeeEditComponent;
