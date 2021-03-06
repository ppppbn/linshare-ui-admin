'use strict';

angular.module('linshareAdminApp')
  .controller('MailLayoutListCtrl',
    ['$scope', '$state', '$filter', '$log', '$modal', '$translate', 'ngTableParams', 'MailLayout',
      'mailLayouts', 'currentDomain',
    function($scope, $state, $filter, $log, $modal, $translate, ngTableParams, MailLayout, mailLayouts, currentDomain) {
      $scope.domain = currentDomain;
      $scope.getTemplate = function() {
        return 'MAIL_LAYOUT';
      };
      $scope.add = function() {
        $modal.open({
          controller: 'mailLayoutModalCtrl',
          templateUrl: 'ng_components/maillayout/maillayout_modal.tpl.html'
        });
      };
      $scope.delete = function(_mailLayout) {
        MailLayout.remove(_mailLayout).then(function() {
          $state.reinit();
        });
      };
      $scope.tableParams = new ngTableParams({ /* jshint ignore: line */
        page: 1,        // show first page
        count: 10,      // count per page
        sorting: {
          description: 'asc'
        }
      }, {
        debugMode: false,
        total: 0, // length of data
        getData: function($defer, params) {
          var orderedData = params.sorting() ?
              $filter('orderBy')(mailLayouts, params.orderBy()) :
              mailLayouts;
          orderedData = params.filter ?
              $filter('filter')(orderedData, params.filter()) : orderedData;
          params.total(orderedData.length);
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });
    }]
  );
