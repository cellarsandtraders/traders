'use strict';

angular.module('tradersApp')
  .controller('UserProfileCtrl', function ($scope, $location, AuthService) {
    if (!$scope.isAuthenticated()) {
      $location.path('/');
      return;
    }

    $scope.logout = function() {
      AuthService.logout();
    };
  });
