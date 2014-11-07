'use strict';

module.exports = function ($injector, $rootScope) {
  return function (destination) {
    var uiRouter = $injector.has('$state');
    var ngRoute  = $injector.has('$route');
    if (!uiRouter && !ngRoute) return;
    var prefix = uiRouter ? '$state' : '$route';
    $rootScope.$on(prefix + 'ChangeStart', function () {
      destination.loaded = false;
    });
    $rootScope.$on(prefix + 'ChangeSuccess', function () {
      destination.loaded = true;
    });
  };
};
module.exports.$inject = ['$injector', '$rootScope'];
