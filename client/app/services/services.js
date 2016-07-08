import angular from 'angular';

import marvel from './marvel.js';

export default angular
  .module('app.services', [])
  .service({
    marvel,
  })
  .name;
