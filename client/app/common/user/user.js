import angular from 'angular';
import UserFactory from './user.factory.js';

const userModule = angular.module('user', [])

.factory('User', UserFactory)

.name;

export default userModule;
