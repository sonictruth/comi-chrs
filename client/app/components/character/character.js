import angular from 'angular';
import uiRouter from 'angular-ui-router';
import characterComponent from './character.component';

const characterModule = angular.module('character', [
  uiRouter,
])

.config(($stateProvider) => {
  'ngInject';
  $stateProvider
    .state('character', {
      url: '/character/:id',
      template: '<character></character>',
    });
})

.component('character', characterComponent)

.name;

export default characterModule;
