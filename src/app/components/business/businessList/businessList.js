import angular from 'angular';
import uiRouter from 'angular-ui-router';
import businessListComponent from './businessList.component';

let businessListModule = angular.module('businessList', [
    uiRouter
  ])
  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

    $urlRouterProvider.otherwise('/business/list');

    $stateProvider.state('business-list', {
      url: '/business/list',
      template: '<business-list></business-list>'
    });
  })
  .component('businessList', businessListComponent);

export default businessListModule;
