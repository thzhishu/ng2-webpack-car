import angular from 'angular';
import uiRouter from 'angular-ui-router';
import customerEditComponent from './customerEdit.component';

let customerEditModule = angular.module('customerEdit', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('customer-edit', {
      url: '/customer-edit',
      template: '<customer-edit></customer-edit>'
    });
})

.component('customerEdit', customerEditComponent);

export default customerEditModule;
