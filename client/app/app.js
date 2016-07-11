import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common.js';
import Components from './components/components.js';
import AppComponent from './app.component.js';

import 'animate.css';

import 'bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'; // FIXME: ugly path
// import '../../node_modules/bootstrap/dist/css/bootstrap-theme.css';


angular.module('app', [
  uiRouter,
  Common,
  Components,
])
.config(($locationProvider) => {
  'ngInject';
  $locationProvider.html5Mode(false);
})

.component('app', AppComponent);

