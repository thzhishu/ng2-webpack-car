import angular from 'angular';
import uiRouter from 'angular-ui-router';
import employeeEditComponent from './employeeEdit.component';

let employeeEditModule = angular.module('employeeEdit', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('employee-edit', {
      url: '/employee-edit',
      template: '<employee-edit></employee-edit>'
    });
})

.component('employeeEdit', employeeEditComponent);

export default employeeEditModule;
