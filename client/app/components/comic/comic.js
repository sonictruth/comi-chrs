import angular from 'angular';
import uiRouter from 'angular-ui-router';
import comicComponent from './comic.component';

const comicModule = angular.module('comic', [
  uiRouter,
])

.config(($stateProvider) => {
  'ngInject';
  $stateProvider
    .state('comic', {
      url: '/comic/:id',
      template: '<comic></comic>',
    });
})

.component('comic', comicComponent)

.name;

export default comicModule;
