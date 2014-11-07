'use strict';

var fs = require('fs');

module.exports = function () {
  return {
    scope: {
      loading: '='
    },
    transclude: true,
    template: fs.readFileSync('./template.html') + fs.readFileSync('./transclude.html'),
    link: function (scope) {
      scope.loading.then(function () {
        scope.loaded = true
      });
    }
  };
};
