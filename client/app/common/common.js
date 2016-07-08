import angular from 'angular';
import Navbar from './navbar/navbar.js';
import Hero from './hero/hero.js';

const commonModule = angular.module('app.common', [
  Navbar,
  Hero,
])

.name;

export default commonModule;
