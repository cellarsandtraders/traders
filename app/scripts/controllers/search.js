'use strict';

/**
 * @ngdoc function
 * @name tradersApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the tradersApp
 */
angular.module('tradersApp')
  .controller('SearchCtrl', function ($scope, brewerydb) {

    $scope.reset= function() {
      $scope.beers = [];
      $scope.noResults = false;
      $scope.text = '';
    };

    $scope.submit = function() {
      $scope.noResults = false;

      brewerydb.search($scope.text).then(
        function (response) {
          if (response.data.totalResults > 0) {
            $scope.beers = response.data.data;
          }
          else {
            $scope.noResults = true;
          }
        }
      );
    };

    $scope.reset();

  });
