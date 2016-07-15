import angular from 'angular';
import uiRouter from 'angular-ui-router';
import employeeAddComponent from './employeeAdd.component';

let employeeAddModule = angular.module('employeeAdd', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('employee-add', {
      url: '/employee-add',
      template: '<employee-add></employee-add>'
    });
})

.component('employeeAdd', employeeAddComponent);

export default employeeAddModule;
