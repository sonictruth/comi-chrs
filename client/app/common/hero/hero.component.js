import template from './hero.html';
import controller from './hero.controller.js';
import './hero.scss';

const heroComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
};

export default heroComponent;
