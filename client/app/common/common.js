import angular from 'angular';
import Navbar from './navbar/navbar.js';
import Hero from './hero/hero.js';
import User from './user/user.js';

const commonModule = angular.module('app.common', [
  Navbar,
  Hero,
  User,
])

.name;

export default commonModule;
