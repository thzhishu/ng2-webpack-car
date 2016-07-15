import angular from 'angular';
import uiRouter from 'angular-ui-router';
import customerListComponent from './customerList.component';

let customerListModule = angular.module('customerList', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('customer-list', {
      url: '/customer-list',
      template: '<customer-list></customer-list>'
    });
})

.component('customerList', customerListComponent);

export default customerListModule;
