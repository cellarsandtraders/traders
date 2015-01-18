'use strict';

app.controller('DashboardCtrl', function ($scope, $window, $location) {
  if (!$window.localStorage.token) {
    $location.path('/');
    return;
  }
  $scope.token = $window.localStorage.token;
  $scope.username = $window.localStorage.username;
});
