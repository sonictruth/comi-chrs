import template from './character.html';
import controller from './character.controller';
import './character.scss';

const characterComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
};

export default characterComponent;
