'use strict';

describe('Service: auth', function () {
  var AuthService, $httpBackend, $window, apiBaseUrl;

  // load the service's module
  beforeEach(module('tradersApp'));

  // instantiate service
  beforeEach(inject(function ($injector) {
    apiBaseUrl = $injector.get('API_SERVER');
    $httpBackend = $injector.get('$httpBackend');
    $window = $injector.get('$window');
    AuthService = $injector.get('AuthService');

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    $window.localStorage.clear();
  });

  // AuthService Unit Tests

  it('should register valid username and password', function() {
    // Mock successful registration
    $httpBackend.whenPOST(
      apiBaseUrl + 'auth/register/',
      {username: 'test', password: 'asdf'}
    ).respond(201, {username: 'test', token: 'xxx'});

    AuthService.register('test', 'asdf');
    $httpBackend.expectPOST(
      apiBaseUrl + 'auth/register/',
      {username: 'test', password: 'asdf'}
    );
    $httpBackend.flush();

    expect($window.localStorage.username).toBe('test');
    expect($window.localStorage.token).toBe('xxx');

  });

  it('should login valid username and password', function() {
    // Mock successful login
    $httpBackend.whenPOST(
      apiBaseUrl + 'auth/login/',
      {username: 'test', password: 'asdf'}
    ).respond(201, {username: 'test', token: 'xxx'});

    AuthService.login('test', 'asdf');
    $httpBackend.expectPOST(
      apiBaseUrl + 'auth/login/',
      {username: 'test', password: 'asdf'}
    );
    $httpBackend.flush();

    expect($window.localStorage.username).toBe('test');
    expect($window.localStorage.token).toBe('xxx');

  });

  it('should logout and delete local storage', function() {
    // Mock successful logout
    $httpBackend.whenPOST(
      apiBaseUrl + 'auth/logout/'
    ).respond(200, {});

    AuthService.logout();
    $httpBackend.expectPOST(
      apiBaseUrl + 'auth/logout/'
    );
    $httpBackend.flush();

    expect($window.localStorage.username).toBe(undefined);
    expect($window.localStorage.token).toBe(undefined);

  });

});
