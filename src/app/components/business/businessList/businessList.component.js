import template from './businessList.html';
import controller from './businessList.controller';
import './businessList.scss';

let businessListComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default businessListComponent;
