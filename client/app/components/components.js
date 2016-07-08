import angular from 'angular';
import Home from './home/home.js';
import About from './about/about.js';

const componentModule = angular.module('app.components', [
  Home,
  About,
])
.name;

export default componentModule;
