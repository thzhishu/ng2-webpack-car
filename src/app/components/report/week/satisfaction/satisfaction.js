import angular from 'angular';
import uiRouter from 'angular-ui-router';
import satisfactionComponent from './satisfaction.component';

let satisfactionModule = angular.module('satisfaction', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('report-week-satisfaction', {
      url: '/report/week/satisfaction',
      template: '<report-week-satisfaction></report-week-satisfaction>'
    });
})

.component('reportWeekSatisfaction', satisfactionComponent);

export default satisfactionModule;
