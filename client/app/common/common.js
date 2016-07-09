import angular from 'angular';
import Navbar from './navbar/navbar.js';
import Graph from './graph/graph.js';
import marvelService from './marvel/marvel.service.js';

const commonModule = angular.module('app.common', [
  Navbar,
  Graph,
]).service({
  marvelService,
})

.name;

export default commonModule;
