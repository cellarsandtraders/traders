'use strict';

describe('Controller: AuthCtrl', function () {
  var $httpBackend, $rootScope, $location, $window, createController, authRequestHandler, apiServer;

  // Set up the module
  beforeEach(module('tradersApp'));

  beforeEach(inject(function($injector) {
    apiServer = $injector.get('API_SERVER');

    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');

    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');

    $location = $injector.get('$location');
    $window = $injector.get('$window');

    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');

    createController = function() {
     return $controller('AuthCtrl', {'$scope' : $rootScope });
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
      apiServer + 'auth/register/',
      {username: 'test', password: 'asdf'}
    ).respond(201, {username: 'test', token: 'xxx'});

    var controller = createController();
    $rootScope.registerUsername = 'test';
    $rootScope.registerPassword = 'asdf';
    $rootScope.register();
    $httpBackend.expectPOST(apiServer + 'auth/register/', {username: 'test', password: 'asdf'});
    $httpBackend.flush();

    expect($location.path()).toBe('/dashboard');
    expect($window.localStorage.username).toBe('test');
    expect($window.localStorage.token).toBe('xxx');
    expect($location.path()).toBe('/dashboard');
  });

  it('should handle registration error response', function() {
    // Mock successful registration
    $httpBackend.whenPOST(
      apiServer + 'auth/register/',
      {username: 'test', password: 'asdf'}
    ).respond(400, {error: 'Invalid Data'});

    var controller = createController();
    $rootScope.registerUsername = 'test';
    $rootScope.registerPassword = 'asdf';
    $rootScope.register();
    $httpBackend.expectPOST(apiServer + 'auth/register/', {username: 'test', password: 'asdf'});
    $httpBackend.flush();

    expect($rootScope.error).toBe('Invalid Data');
    expect($window.localStorage.username).toBe(undefined);
    expect($window.localStorage.token).toBe(undefined);
  });

  it('should error without username and password', function() {
    var controller = createController();
    $rootScope.register();
    expect($rootScope.error).toBe('Username and password required');
    expect($window.localStorage.username).toBe(undefined);
    expect($window.localStorage.token).toBe(undefined);
  });


  // LOGIN TESTS

  it('should login valid username and password', function() {
    // Mock failed login attempt
    $httpBackend.whenPOST(
      apiServer + 'auth/login/',
      {username: 'test', password: 'asdf'}
    ).respond(200, {username: 'test', token: 'xxx'});

    var controller = createController();
    $rootScope.loginUsername = 'test';
    $rootScope.loginPassword = 'asdf';
    $rootScope.login();
    $httpBackend.expectPOST(apiServer + 'auth/login/', {username: 'test', password: 'asdf'});
    $httpBackend.flush();

    expect($location.path()).toBe('/dashboard');
    expect($window.localStorage.username).toBe('test');
    expect($window.localStorage.token).toBe('xxx');
    expect($location.path()).toBe('/dashboard');
  });

  it('should fail authentication', function() {
    // Mock failed login attempt
    $httpBackend.whenPOST(
      apiServer + 'auth/login/',
      {username: 'xxx', password: 'yyy'}
    ).respond(400, {error: 'Invalid Username/Password'});

    var controller = createController();
    $rootScope.loginUsername = 'xxx';
    $rootScope.loginPassword = 'yyy';
    $rootScope.login();
    $httpBackend.expectPOST(apiServer + 'auth/login/', {username: 'xxx', password: 'yyy'});
    $httpBackend.flush();
    expect($rootScope.error).toBe('Invalid Username/Password');
  });

  it('should error without username and password', function() {
    var controller = createController();
    $rootScope.login();
    expect($rootScope.error).toBe('Username and password required');
    expect($window.localStorage.username).toBe(undefined);
    expect($window.localStorage.token).toBe(undefined);
  });

});
