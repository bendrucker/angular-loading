'use strict';

module.exports = function () {
  return {
    scope: {
      loading: '='
    },
    transclude: true,
    template: require('./template.html') + require('./transclude.html'),
    link: function (scope) {
      scope.loading.then(function () {
        scope.loaded = true
      });
    }
  };
};
