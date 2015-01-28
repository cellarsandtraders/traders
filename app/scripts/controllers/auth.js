'use strict';

angular.module('tradersApp')
  .controller('AuthCtrl', function ($scope, $location, AuthService) {

    $scope.register = function () {
      var username = $scope.username,
        password = $scope.password1,
        password2 = $scope.password2;
        //email = $scope.email;

      if (password !== password2) {
        $scope.error = 'Passwords do not match';
      }
      else if (username && password) {
        AuthService.register(username, password).then(
          function () {
            $location.path('/dashboard');
          },
          function (error) {
            $scope.error = error;
          }
        );
      }
      else {
        $scope.error = 'Username and password required';
      }
    };

    $scope.login = function () {
      var username = $scope.username,
        password = $scope.password;

      if (username && password) {
        AuthService.login(username, password).then(
          function () {
            $location.path('/dashboard');
          },
          function (error) {
            $scope.error = error;
          }
        );
      } else {
        $scope.error = 'Username and password required';
      }
    };
  });
