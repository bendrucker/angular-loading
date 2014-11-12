'use strict';

var angular = require('angular');

describe('loading', function () {

  beforeEach(angular.mock.module(require('../')));

  describe('sync service', function () {

    require('angular-route');
    require('angular-ui-router');

    it('syncs load state for ui.router', function () {
      angular.mock.module('ui.router');
      angular.mock.inject(function (syncLoaded, $rootScope) {
        var destination = {};
        syncLoaded(destination);
        expect(destination.loaded).to.be.false;
        $rootScope.$broadcast('$stateChangeStart');
        expect(destination.loaded).to.be.false;
        $rootScope.$broadcast('$stateChangeSuccess');
        expect(destination.loaded).to.be.true;
      });
    });

    it('syncs load state for ngRoute', function () {
      angular.mock.module('ngRoute');
      angular.mock.inject(function (syncLoaded, $rootScope) {
        var destination = {};
        syncLoaded(destination);
        expect(destination.loaded).to.be.false;
        $rootScope.$broadcast('$routeChangeStart');
        expect(destination.loaded).to.be.false;
        $rootScope.$broadcast('$routeChangeSuccess');
        expect(destination.loaded).to.be.true;
      });
    });

    it('is a noop with no router', function () {
      angular.mock.inject(function (syncLoaded, $rootScope) {
        var destination = {}
        syncLoaded(destination);
        $rootScope.$broadcast('$routeChangeSuccess');
        $rootScope.$broadcast('$stateChangeSuccess');
        expect(destination.loaded).to.be.undefined;
      });
    });

  });

  describe('directive', function () {

    var element, scope, deferred;
    beforeEach(angular.mock.inject(function ($injector) {
      scope         = $injector.get('$rootScope').$new();
      deferred      = $injector.get('$q').defer();
      scope.promise = deferred.promise;
      element       = $injector.get('$compile')('<div loading="promise">Loaded</div>')(scope);
      scope.$digest();
    }));

    it('displays a loading indicator when the promise is pending', function () {
      expect(element.text()).to.not.contain('Loaded');
      expect(element.children()).to.have.length(1);
      var indicator = angular.element(element.children()[0]);
      expect(indicator.hasClass('loading-indicator-content'))
        .to.be.true;
    });

    it('displays the content when the promise resolves', function () {
      deferred.resolve();
      scope.$digest();
      expect(element.text()).to.contain('Loaded');
      expect(element.children()).to.have.length(1);
    });

  });

});
