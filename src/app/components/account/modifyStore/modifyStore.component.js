import template from './modifyStore.html';
import controller from './modifyStore.controller';
require("!style!css!sass!./modifyStore.scss");


let modifyStoreComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default modifyStoreComponent;
