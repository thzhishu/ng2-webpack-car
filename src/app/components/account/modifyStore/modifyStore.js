import angular from 'angular';
import uiRouter from 'angular-ui-router';
import modifyStoreComponent from './modifyStore.component';

let modifyStoreModule = angular.module('modifyStore', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('modify-store', {
      url: '/modify-store/:id',
      template: '<modify-store></modify-store>'
    });
})

.component('modifyStore', modifyStoreComponent);

export default modifyStoreModule;
