import template from './customerEdit.html';
import controller from './customerEdit.controller';
import './customerEdit.scss';

let customerEditComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default customerEditComponent;
