import angular from 'angular';
import uiRouter from 'angular-ui-router';
import menusComponent from './menus.component';

let menusModule = angular.module('menus', [
  uiRouter
])

.component('menus', menusComponent);

export default menusModule;
