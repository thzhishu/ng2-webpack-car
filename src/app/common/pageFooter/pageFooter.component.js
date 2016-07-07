import template from './pageFooter.html';
import controller from './pageFooter.controller';
import './pageFooter.scss';

let pageFooterComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default pageFooterComponent;
