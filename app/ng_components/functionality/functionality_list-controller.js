'use strict';

angular.module('linshareAdminApp')
  .controller('FunctionalityListCtrl',
    ['_', '$scope', '$filter', '$q', '$translate', '$state', 'ngTableParams', 'functionalities', 'currentDomain',
    function(_, $scope, $filter, $q, $translate, $state, ngTableParams, functionalities, currentDomain) {
      $scope.domain = currentDomain;
      $scope.view = $state.params.view;

      $scope.showFunctionality = function(functionality) {
        return functionality.activationPolicy.parentAllowUpdate ||
          functionality.configurationPolicy.parentAllowUpdate;
      };
      $scope.isActivated = function(functionality) {
        return functionality.activationPolicy.status;
      };
      $scope.localizedName = function() {
        var def = $q.defer();
        var names = [];

        def.resolve(names);
        return def;
      };
      $scope.tableParams = new ngTableParams({ /* jshint ignore: line */
        page: 1,        // show first page
        count: 50,      // count per page
        sorting: {
          localizedName: 'asc'
        }
      }, {
        debugMode: false,
        counts: [],
        total: 0, // length of data
        getData: function($defer, params) {
          var displayableFuncs = _.where(functionalities, {'displayable': true});
          var nameFilter = params.filter().localizedName;
          var deferred = $q.defer();

          if (!_.isEmpty(nameFilter)) {
            var ids = _.pluck(displayableFuncs, 'identifier');
            var localizedNames = _.map(ids, function(id) {return 'FUNCTIONALITIES.DETAILS.' + id + '.NAME';});
            $translate(localizedNames).then(
              function(translations) {
                deferred.resolve(_.filter(displayableFuncs, function(f) {
                  return translations['FUNCTIONALITIES.DETAILS.' + f.identifier + '.NAME']
                    .toLowerCase()
                    .indexOf(nameFilter.toLowerCase()) !== -1;
                }));
              }
            );
            deferred.promise.then(function(data) {
              var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
              params.total(orderedData.length);
              $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            });
          } else {
            var orderedData = params.sorting() ? $filter('orderBy')(displayableFuncs, params.orderBy()) :
              displayableFuncs;
            params.total(orderedData.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          }
        }
      });
    }]
  );

