'use strict';

describe('Factory: brewerydb', function () {

  // load the service's module
  beforeEach(module('tradersApp'));

  // instantiate service
  var brewerydb;
  beforeEach(inject(function (_brewerydb_) {
    brewerydb = _brewerydb_;
  }));

  it('should do something', function () {
    expect(!!brewerydb).toBe(true);
  });

});
