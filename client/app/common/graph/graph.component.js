import template from './graph.html';
import controller from './graph.controller.js';
import './graph.scss';

const graphComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm',
};

export default graphComponent;
