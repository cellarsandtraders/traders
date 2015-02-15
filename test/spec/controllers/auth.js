'use strict';

describe('Controller: AuthCtrl', function () {
  var $httpBackend, $rootScope, $location, $window, createController, apiBaseUrl;

  // Set up the module
  beforeEach(module('tradersApp'));

  beforeEach(inject(function($injector) {
    apiBaseUrl = $injector.get('API_SERVER');

    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');

    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');

    $location = $injector.get('$location');
    $window = $injector.get('$window');

    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');

    createController = function() {
      $controller('RootCtrl', {'$scope' : $rootScope });
      $controller('AuthCtrl', {'$scope' : $rootScope });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    $window.localStorage.clear();
  });


  // REGISTRATION TESTS

  it('should register valid username and password', function() {
    // Mock successful registration
    $httpBackend.whenPOST(
      apiBaseUrl + 'auth/register/',
      {username: 'test', password: 'asdf'}
    ).respond(201, {user: {username: 'test'}, token: 'xxx'});

    createController();
    $rootScope.username = 'test';
    $rootScope.password1 = 'asdf';
    $rootScope.password2 = 'asdf';
    $rootScope.register();
    $httpBackend.expectPOST(apiBaseUrl + 'auth/register/', {username: 'test', password: 'asdf'});
    $httpBackend.flush();

    expect($location.path()).toEqual('/profile');
    expect($window.localStorage.token).toEqual('xxx');
    expect($rootScope.isAuthenticated()).toBeTruthy();
    expect($rootScope.currentUser).toEqual({username: 'test'});
  });

  it('should handle registration error response', function() {
    // Mock successful registration
    $httpBackend.whenPOST(
      apiBaseUrl + 'auth/register/',
      {username: 'test', password: 'asdf'}
    ).respond(400, {error: 'Invalid Data'});

    createController();
    $rootScope.username = 'test';
    $rootScope.password1 = 'asdf';
    $rootScope.password2 = 'asdf';
    $rootScope.register();
    $httpBackend.expectPOST(apiBaseUrl + 'auth/register/', {username: 'test', password: 'asdf'});
    $httpBackend.flush();

    expect($rootScope.error).toEqual('Invalid Data');
    expect($window.localStorage.token).toBeUndefined();
    expect($rootScope.isAuthenticated()).toBeFalsy();
    expect($rootScope.currentUser).toBeNull();
  });

  it('should error when passwords do not match', function() {
    // Mock successful registration
    $httpBackend.whenPOST(
      apiBaseUrl + 'auth/register/',
      {username: 'test', password: 'asdf'}
    ).respond(400, {error: 'Invalid Data'});

    createController();
    $rootScope.username = 'test';
    $rootScope.password1 = 'asdf';
    $rootScope.password2 = 'xxx';
    $rootScope.register();

    expect($rootScope.error).toEqual('Passwords do not match');
    expect($window.localStorage.token).toBeUndefined();
    expect($rootScope.isAuthenticated()).toBeFalsy();
    expect($rootScope.currentUser).toBeNull();
  });

  it('should error without username and password', function() {
    createController();
    $rootScope.register();
    expect($rootScope.error).toEqual('Username and password required');
    expect($window.localStorage.token).toBeUndefined();
    expect($rootScope.isAuthenticated()).toBeFalsy();
    expect($rootScope.currentUser).toBeNull();
  });


  // LOGIN TESTS

  it('should login valid username and password', function() {
    // Mock failed login attempt
    $httpBackend.whenPOST(
      apiBaseUrl + 'auth/login/',
      {username: 'test', password: 'asdf'}
    ).respond(200, {user: {username: 'test'}, token: 'xxx'});

    createController();
    $rootScope.username = 'test';
    $rootScope.password = 'asdf';
    $rootScope.login();
    $httpBackend.expectPOST(apiBaseUrl + 'auth/login/', {username: 'test', password: 'asdf'});
    $httpBackend.flush();

    expect($location.path()).toEqual('/profile');
    expect($window.localStorage.token).toEqual('xxx');
    expect($rootScope.isAuthenticated()).toBeTruthy();
    expect($rootScope.currentUser).toEqual({username: 'test'});
  });

  it('should fail authentication', function() {
    // Mock failed login attempt
    $httpBackend.whenPOST(
      apiBaseUrl + 'auth/login/',
      {username: 'xxx', password: 'yyy'}
    ).respond(400, {error: 'Invalid Username/Password'});

    createController();
    $rootScope.username = 'xxx';
    $rootScope.password = 'yyy';
    $rootScope.login();
    $httpBackend.expectPOST(apiBaseUrl + 'auth/login/', {username: 'xxx', password: 'yyy'});
    $httpBackend.flush();
    expect($rootScope.error).toEqual('Invalid Username/Password');
    expect($rootScope.isAuthenticated()).toBeFalsy();
    expect($rootScope.currentUser).toBeNull();
  });

  it('should error without username and password', function() {
    createController();
    $rootScope.login();
    expect($rootScope.error).toEqual('Username and password required');
    expect($window.localStorage.token).toBeUndefined();
    expect($rootScope.isAuthenticated()).toBeFalsy();
    expect($rootScope.currentUser).toBeNull();
  });

});
