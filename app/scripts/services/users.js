'use strict';

/*
  Users API
  GET: /api/users
  GET: /api/users/:username
  POST: /api/users/:username
  GET: /api/users/:username/:collection/
  POST: /api/users/:username/:collection/
  DELETE: /api/users/:username/:collection/:item_id
 */
angular.module('tradersApp')
  .factory('Users', function ($resource, API_SERVER) {
    var urlBase = API_SERVER + 'users';

    // Public API here
    return $resource(urlBase + '/:username/:collection/:item_id', {username:'@username'});

  });
