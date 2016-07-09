import angular from 'angular';
import uiRouter from 'angular-ui-router';
import graphComponent from './graph.component.js';

const graphModule = angular.module('graph', [
  uiRouter,
])

.component('graph', graphComponent)

.name;

export default graphModule;
