'use strict';

angular.module('tradersApp')
  .factory('brewerydb', function ($http, API_SERVER) {

    var urlBase = API_SERVER + 'search/',
        brewerydb = {};

    brewerydb.search = function (query) {
      var url = urlBase + '?q=' + encodeURIComponent(query);
      return $http.get(url, {
        headers: {'Content-Type': 'application/json'}
      });

    };

    return brewerydb;
  });