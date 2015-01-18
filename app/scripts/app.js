'use strict';

/**
 * @ngdoc overview
 * @name tradersApp
 * @description
 * # tradersApp
 *
 * Main module of the application.
 */
var app = angular.module('tradersApp', [
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize'
]);
app.config(function ($routeProvider) {
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
    .otherwise({
      redirectTo: '/'
    });
});
app.constant('API_SERVER', 'http://127.0.0.1:8000/api/');
