import template from './initStore.html';
import controller from './initStore.controller';
import './initStore.scss';

let initStoreComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default initStoreComponent;
