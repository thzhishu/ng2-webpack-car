import angular from 'angular';
import uiRouter from 'angular-ui-router';
import customerDetailComponent from './customerDetail.component';

let customerDetailModule = angular.module('customerDetail', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('customer-detail', {
      url: '/customer-detail',
      template: '<customer-detail></customer-detail>'
    });
})

.component('customerDetail', customerDetailComponent);

export default customerDetailModule;
