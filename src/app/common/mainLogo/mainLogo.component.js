import template from './mainLogo.html';
import controller from './mainLogo.controller';
import './mainLogo.scss';

let mainLogoComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default mainLogoComponent;
