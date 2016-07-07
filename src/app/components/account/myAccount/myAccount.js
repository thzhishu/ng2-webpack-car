import angular from 'angular';
import uiRouter from 'angular-ui-router';
import myAccountComponent from './myAccount.component';

let myAccountModule = angular.module('myAccount', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('my-account', {
      url: '/my-account',
      template: '<my-account></my-account>'
    });
})

.component('myAccount', myAccountComponent);

export default myAccountModule;
