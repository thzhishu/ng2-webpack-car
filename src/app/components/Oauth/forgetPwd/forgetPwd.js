import angular from 'angular';
import uiRouter from 'angular-ui-router';
import forgetPwdComponent from './forgetPwd.component';

let forgetPwdModule = angular.module('forgetPwd', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('forget-pwd', {
      url: '/forget-pwd',
      template: '<forget-pwd></forget-pwd>'
    });
})

.component('forgetPwd', forgetPwdComponent);

export default forgetPwdModule;
