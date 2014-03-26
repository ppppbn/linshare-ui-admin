'use strict';

app.directive('lsLdapConnectionForm', [
  function() {
    return {
      restrict: 'A',
      scope: true,
      transclude: false,
      controller: 
        ['$scope', '$modal', '$log', 'LdapConnection', 'localize',
        function($scope, $modal, $log, LdapConnection, localize) {
          $scope.submit = function() {
            if ($scope.state === 'edit') {
              LdapConnection.update(
                $scope.ldapConnection,
                function successCallback() {
                  $scope.reloadList();
                  $scope.switchView();
                }
              );
            } else {
              LdapConnection.add(
                $scope.ldapConnection,
                function successCallback() {
                  $scope.reloadList();
                  $scope.switchView();
                }
              );
            }
          };
          $scope.remove = function() {
            if ($scope.state === 'edit') {
              var modalInstance = $modal.open({
                templateUrl: '/views/templates/confirm_dialog.html',
                controller: 'ConfirmDialogCtrl',
                resolve: {
                  content: function() {
                    return localize.getLocalizedString(
                      'P_Domains-LDAPConnections_ConfirmDeleteText'
                    );
                  }
                }
              });
              modalInstance.result.then(
                function validate() {
                  LdapConnection.remove(
                    $scope.ldapConnection,
                    function successCallback() {
                      $scope.reloadList();
                      $scope.switchView();
                    }
                  );
                }, function cancel() {
                  $log.debug('Deletion modal dismissed');
                }
              );
            } else {
              $log.error('Invalid state');
            }
          };
          $scope.reset = function() {
            $scope.ldapConnection = {};
            if (LdapConnection.currentIsDefined()) {
              $scope.state = 'edit';
              angular.copy(LdapConnection.getCurrent(), $scope.ldapConnection);
            } else {
              $scope.state = 'create';
            }
          };
          $scope.reset();
        }
      ],
      templateUrl: '/views/templates/domains/ldap_connection_form.html',
      replace: false
    };
  }
]);