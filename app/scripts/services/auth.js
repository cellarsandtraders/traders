'use strict';

angular.module('tradersApp')
  .factory('AuthService', function ($http, $window, $q, API_SERVER) {

    var authenticate = function (username, password, endpoint) {
      var deferred = $q.defer(),
        url = API_SERVER + 'auth/' + endpoint + '/';

      $http.post(url, {
        username: username,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        function (response) {
          // success callback
          var token = response.data.token;
          var username = response.data.username;

          if (token && username) {
            $window.localStorage.token = token;
            $window.localStorage.username = username;
            //success
            deferred.resolve(true);
          } else {
            // error
            deferred.reject('Invalid data received from server');
          }
        },
        function (response) {
          // error callback
          deferred.reject(response.data.error);
        }
      );
      return deferred.promise;
    };

    var logout = function () {
      var deferred = $q.defer(),
        url = API_SERVER + 'auth/logout/';

      $http.post(url).then(
        function () {
          $window.localStorage.removeItem('token');
          $window.localStorage.removeItem('username');
          deferred.resolve();
        },
        function (error) {
          deferred.reject(error.data.error);
        }
      );
      return deferred.promise;
    };

    return {
      register: function (username, password) {
        return authenticate(username, password, 'register');
      },
      login: function (username, password) {
        return authenticate(username, password, 'login');
      },
      logout: function() {
        return logout();
      }
    };

  });
