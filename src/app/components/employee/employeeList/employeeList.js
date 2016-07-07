import angular from 'angular';
import uiRouter from 'angular-ui-router';
import employeeListComponent from './employeeList.component';

let employeeListModule = angular.module('employeeList', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('employee-list', {
      url: '/employee-list',
      template: '<employee-list></employee-list>'
    });
})

.component('employeeList', employeeListComponent);

export default employeeListModule;
