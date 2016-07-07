import angular from 'angular';
import uiRouter from 'angular-ui-router';
import businessComponent from './business.component';

let businessModule = angular.module('business', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('report-week-business', {
      url: '/report/week/business',
      template: '<report-week-business></report-week-business>'
    });
})

.component('reportWeekBusiness', businessComponent);

export default businessModule;
