import angular from 'angular';
import uiRouter from 'angular-ui-router';
import modifyPwdComponent from './modifyPwd.component';

let modifyPwdModule = angular.module('modifyPwd', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('modify-pwd', {
      url: '/modify-pwd',
      template: '<modify-pwd></modify-pwd>'
    });
})

.component('modifyPwd', modifyPwdComponent);

export default modifyPwdModule;
