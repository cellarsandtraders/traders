'use strict';

describe('Factory: brewerydb', function () {
  var $httpBackend, apiBaseUrl, brewerydb;

  // load the service's module
  beforeEach(module('tradersApp'));

  // instantiate service
  beforeEach(inject(function ($injector) {
    apiBaseUrl = $injector.get('API_SERVER');
    $httpBackend = $injector.get('$httpBackend');
    brewerydb = $injector.get('brewerydb');
  }));

  // brewerydb Unit Tests

  it('should return search results', function() {
    // Mock successful registration
    $httpBackend.whenGET(
      apiBaseUrl + 'search/?q=big%20hugs'
    ).respond(200, {'data': {'data': ['beer1', 'beer2']}});

    brewerydb.search('big hugs');
    $httpBackend.expectGET(
      apiBaseUrl + 'search/?q=big%20hugs'
    );
    $httpBackend.flush();
  });

});
