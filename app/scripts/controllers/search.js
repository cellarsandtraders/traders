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
      $scope.loading = false;
      $scope.text = '';
      $scope.error = '';
    };

    $scope.submit = function() {
      var query = $scope.text;
      $scope.reset();
      $scope.text = query;

      $scope.loading = true;
      brewerydb.search(query).then(
        // Success
        function (response) {
          if (response.data.totalResults > 0) {
            $scope.beers = response.data.data;
          }
          else {
            $scope.noResults = true;
          }
        },
        // Error
        function (response) {
          $scope.error = 'Error: ' + response.data.error;
          console.log(response);
        }
      ).finally(function() {
        $scope.loading = false;
      });
    };

    $scope.reset();

  });
