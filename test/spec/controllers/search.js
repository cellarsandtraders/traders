'use strict';

describe('Controller: SearchCtrl', function () {
  var $httpBackend, $rootScope, createController, apiBaseUrl;

  // load the controller's module
  beforeEach(module('tradersApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {

    apiBaseUrl = $injector.get('API_SERVER');

    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');

    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');

    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('SearchCtrl', {'$scope' : $rootScope });
    };
  }));

  // Seaerch Tests

  it('should return search results', function() {
    // Mock successful registration
    $httpBackend.whenGET(
      apiBaseUrl + 'search/?q=big%20hugs'
    ).respond(200, {'totalResults': 2, 'data': ['beer1', 'beer2']});

    createController();
    expect($rootScope.beers).toEqual([]);
    expect($rootScope.noResults).toEqual(false);
    expect($rootScope.text).toEqual('');

    $rootScope.text = 'big hugs';
    $rootScope.submit();
    $httpBackend.expectGET(apiBaseUrl + 'search/?q=big%20hugs');
    $httpBackend.flush();
    expect($rootScope.beers).toEqual(['beer1', 'beer2']);
  });

});
