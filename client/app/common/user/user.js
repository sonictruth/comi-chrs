import angular from 'angular';
import UserFactory from './user.factory';

const userModule = angular.module('user', [])

.factory('User', UserFactory)

.name;

export default userModule;
