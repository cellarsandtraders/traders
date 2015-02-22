'use strict';

/**
 * @ngdoc function
 * @name tradersApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the tradersApp
 */
angular.module('tradersApp')
  .controller('RootCtrl', function ($scope, AuthService) {

    $scope.isAuthenticated = function() {
      return AuthService.isAuthenticated();
    };

    $scope.getCurrentUsername = function() {
      return AuthService.getCurrentUsername();
    };

  });
