'use strict';

/**
 * @ngdoc function
 * @name tradersApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Root Controller of the tradersApp
 */
angular.module('tradersApp')
  .controller('RootCtrl', function ($scope, AuthService) {
    $scope.currentUser = null;
    $scope.isAuthenticated = AuthService.isAuthenticated;

    $scope.setCurrentUser = function (user) {
      $scope.currentUser = user;
    };
  });
