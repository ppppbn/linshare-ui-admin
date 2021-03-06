'use strict';

// https://github.com/realcrowd/angularjs-utilities

angular.module('linshareAdminApp').directive('lsFormAttempt', [
  function() {
    return {
      restrict: 'A',
      controller: function() {
        this.attempted = false;
        var attemptHandlers = [];
        this.onAttempt = function(handler) {
          attemptHandlers.push(handler);
        };
        this.setAttempted = function() {
          this.attempted = true;
          angular.forEach(attemptHandlers, function(handler) {
            handler();
          });
        };
      },
      compile: function() {
        return {
          pre: function(scope, formElement, attributes, attemptController) {
            scope.ls = scope.ls || {};
            scope.ls[attributes.name] = attemptController;
          },
          post: function(scope, formElement, attributes, attemptController) {
            formElement.bind('submit', function() {
              attemptController.setAttempted();
              if (!scope.$$phase) {
                scope.$apply();
              }
            });
          }
        };
      }
    };
  }
]);
