'use strict';

angular.module('tradersApp')
  .controller('UserProfileCtrl', function ($scope, $location, AuthService, Users) {
    if (!AuthService.isAuthenticated()) {
      $location.path('/');
      return;
    }

    // Get username from session
    var username = AuthService.getCurrentUsername();

    // Construct User Resource
    var user = Users.get({username: username}, function() {
      $scope.user = user;
    });

    // Update User model
    $scope.update = function() {
      $scope.user.$save();
    };

    // Destroy current auth session
    $scope.logout = function() {
      AuthService.logout();
    };
  });
