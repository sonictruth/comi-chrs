import angular from 'angular';
import Home from './home/home.js';
import About from './about/about.js';
import Comic from './comic/comic.js';
import Character from './character/character.js';

const componentModule = angular.module('app.components', [
  Home,
  About,
  Comic,
  Character,
])
.name;

export default componentModule;
