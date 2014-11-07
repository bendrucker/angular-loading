'use strict';

require('angular')
  .module('angular-loading', [])
  .directive('loading', require('./directive'))
  .factory('syncLoaded', require('./sync'));

module.exports = 'angular-loading';
