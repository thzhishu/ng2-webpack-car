import angular from 'angular';
import uiRouter from 'angular-ui-router';
import initStoreComponent from './initStore.component';

let initStoreModule = angular.module('initStore', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('init-store', {
      url: '/init-store',
      template: '<init-store></init-store>'
    });
})

.component('initStore', initStoreComponent);

export default initStoreModule;
