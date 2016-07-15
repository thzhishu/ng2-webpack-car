import template from './employeeAdd.html';
import controller from './employeeAdd.controller';
import './employeeAdd.scss';

let employeeAddComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default employeeAddComponent;
