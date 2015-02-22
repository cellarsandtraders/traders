'use strict';

angular.module('tradersApp')
  .controller('UserProfileCtrl', function ($scope, $location, AuthService, Users) {
    if (!$scope.isAuthenticated()) {
      $location.path('/');
      return;
    }

    $scope.user = AuthService.getCurrentUser();

    $scope.logout = function() {
      AuthService.logout();
    };
  });
