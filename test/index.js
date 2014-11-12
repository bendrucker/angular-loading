'use strict';

var angular = require('angular');

describe('loading', function () {

  beforeEach(angular.mock.module(require('../')));

  describe('sync service', function () {

    require('angular-route');
    require('angular-ui-router');

    var destination, $rootScope;

    it('syncs load state for ui.router', function () {
      destination = {};
      angular.mock.module('ui.router');
      angular.mock.inject(function (syncLoaded, _$rootScope_) {
        syncLoaded(destination);
        $rootScope = _$rootScope_;
      });
      expect(destination.loaded).to.be.false;
      $rootScope.$broadcast('$stateChangeStart');
      expect(destination.loaded).to.be.false;
      $rootScope.$broadcast('$stateChangeSuccess');
      expect(destination.loaded).to.be.true;
    });

    it('syncs load state for ngRoute', function () {
      destination = {};
      angular.mock.module('ngRoute');
      angular.mock.inject(function (syncLoaded, _$rootScope_) {
        syncLoaded(destination);
        $rootScope = _$rootScope_;
      });
      expect(destination.loaded).to.be.false;
      $rootScope.$broadcast('$routeChangeStart');
      expect(destination.loaded).to.be.false;
      $rootScope.$broadcast('$routeChangeSuccess');
      expect(destination.loaded).to.be.true;
    });

  });

});
