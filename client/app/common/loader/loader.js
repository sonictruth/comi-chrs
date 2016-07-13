import './loader.scss';
import template from './loader.html';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

const loaderComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: function controller() {},
};

const loaderModule = angular.module('loader', [
  uiRouter,
])

.component('loader', loaderComponent)

.name;

export default loaderModule;
