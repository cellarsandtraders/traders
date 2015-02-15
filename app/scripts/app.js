'use strict';

/**
 * @ngdoc overview
 * @name tradersApp
 * @description
 * # tradersApp
 *
 * Main module of the application.
 */
angular.module('tradersApp', [
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize'
])
.config(function ($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactCtrl'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'UserProfileCtrl'
    })
    .when('/search', {
      templateUrl: 'views/search.html',
      controller: 'SearchCtrl'
    })
    .when('/users', {
      templateUrl: 'views/users.html',
      controller: 'UsersCtrl'
    })
    .when('/users/:username', {
      templateUrl: 'views/user-details.html',
      controller: 'UserDetailCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
})
.constant('API_SERVER', 'http://127.0.0.1:8000/api/');
