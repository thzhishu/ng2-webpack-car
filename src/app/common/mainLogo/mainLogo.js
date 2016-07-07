import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mainLogoComponent from './mainLogo.component';

let mainLogoModule = angular.module('mainLogo', [
  uiRouter
])

.component('mainLogo', mainLogoComponent);

export default mainLogoModule;
