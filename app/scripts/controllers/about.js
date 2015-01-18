'use strict';

/**
 * @ngdoc function
 * @name tradersApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tradersApp
 */
angular.module('tradersApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
