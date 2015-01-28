'use strict';

angular.module('tradersApp')
  .controller('UsersCtrl', function ($scope, Users) {

    var users = Users.query(function() {
      $scope.users = users;
    });

  })
  .controller('UserDetailCtrl', function ($scope, $routeParams, Users) {

    var user = Users.get({username: $routeParams.username}, function() {
      $scope.user = user;
    });

    var cellar = Users.query({username: $routeParams.username, collection: 'cellar'}, function() {
      $scope.cellar = cellar;
    });

    var wishlist = Users.query({username: $routeParams.username, collection: 'wishlist'}, function() {
      $scope.wishlist = wishlist;
    });

  })
;
