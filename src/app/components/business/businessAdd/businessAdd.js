import angular from 'angular';
import uiRouter from 'angular-ui-router';
import businessAddComponent from './businessAdd.component';

let businessAddModule = angular.module('businessAdd', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/business/add/1');

  $stateProvider.state('business-add', {
    url: "/business/add/:step",
    template: '<business-add></business-add>'
  });

  // $stateProvider
  //   .state('business-add', {
  //     url: '/business-add/:step',
  //     template: '<business-add></business-add>'
  //   });
})
.component('businessAdd', businessAddComponent);

export default businessAddModule;
