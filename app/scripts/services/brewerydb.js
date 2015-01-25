'use strict';

angular.module('tradersApp')
  .factory('breweryDBFactory', function ($http, API_SERVER) {

    var urlBase = API_SERVER + 'search/',
        breweryDBFactory = {};

    breweryDBFactory.search = function (query) {
      var url = urlBase + '?q=' + encodeURIComponent(query);
      return $http.get(url, {
        headers: {'Content-Type': 'application/json'}
      });

    };

    return breweryDBFactory;
  });