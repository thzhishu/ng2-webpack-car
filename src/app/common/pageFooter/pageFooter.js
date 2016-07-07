import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pageFooterComponent from './pageFooter.component';

let pageFooterModule = angular.module('pageFooter', [
  uiRouter
])

.component('pageFooter', pageFooterComponent);

export default pageFooterModule;
