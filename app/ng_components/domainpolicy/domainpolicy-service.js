'use strict';

angular.module('linshareAdminApp')
  .factory('DomainPolicy', ['$log', 'Restangular', 'Notification',
    function ($log, Restangular, Notification) {
      //var self = this;

      // Public API here
      return {
        getAll: function(successCallback) {
          $log.debug('DomainPolicy:getAll');
          return Restangular.all('domain_policies').getList().then(
            function success(domainPolicies) {
              if (successCallback) {
                return successCallback(domainPolicies);
              }
            },
            function error() {
              $log.error(
                [
                 'DomainPolicy:getAll',
                 'Unable to get all domain policies',
                ].join('\n')
              );
            }
          );
        },
        get: function(id, successCallback) {
          $log.debug('DomainPolicy:get');
          return Restangular.one('domain_policies', id).get().then(
            function success(domainPolicy) {
              if (successCallback) {
                return successCallback(domainPolicy);
              }
            },
            function error() {
              $log.error(
                [
                 'DomainPolicy:get',
                 'Unable to get a domain policy',
                ].join('\n')
              );
            }
          );
        },
        add: function(domainPolicy, successCallback) {
          $log.debug('DomainPolicy:add');
          return Restangular.all('domain_policies').post(domainPolicy).then(
            function success(domainPolicy) {
              Notification.addSuccess('CREATE');
              if (successCallback) {
                return successCallback(domainPolicy);
              }
            },
            function error() {
              $log.error(
                [
                 'DomainPolicy:add',
                 'Unable to add a domain policy',
                ].join('\n')
              );
              $log.error(domainPolicy);
            }
          );
        },
        update: function(domainPolicy, successCallback) {
          $log.debug('DomainPolicy:update');
          return domainPolicy.put().then(
            function success(domainPolicy) {
              Notification.addSuccess('UPDATE');
              if (successCallback) {
                return successCallback(domainPolicy);
              }
            },
            function error() {
              $log.error(
                [
                 'DomainPolicy:update',
                 'Unable to update domain policy',
                ].join('\n')
              );
              $log.error(domainPolicy);
            }
          );
        },
        remove: function(domainPolicy, successCallback) {
          $log.debug('DomainPolicy:remove');
          return domainPolicy.remove().then(
            function success(domainPolicy) {
              Notification.addSuccess('DELETE');
              if (successCallback) {
                return successCallback(domainPolicy);
              }
            },
            function error() {
              $log.error(
                [
                 'DomainPolicy:remove',
                 'Unable to remove domain policy',
                ].join('\n')
              );
              $log.error(domainPolicy);
            }
          );
        },
      };
    }
  ]
);
