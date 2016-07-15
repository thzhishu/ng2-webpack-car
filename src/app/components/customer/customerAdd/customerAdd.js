import angular from 'angular';
import uiRouter from 'angular-ui-router';
import customerAddComponent from './customerAdd.component';

let customerAddModule = angular.module('customerAdd', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('customer-add', {
      url: '/customer-add',
      template: '<customer-add></customer-add>'
    });
})

.component('customerAdd', customerAddComponent);

export default customerAddModule;
