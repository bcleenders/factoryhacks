'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('RedirectCtrl', function ($scope, $state, $stateParams, $location, $sessionStorage, $http) {

        $scope.$state = $state;

        // Post uber access token to the backend
        var uberToken = $stateParams.code;
        console.log(uberToken);

        var req = {
            method: 'POST',
            url: 'http://localhost:3000/uber/' + $sessionStorage.userId + "/authenticate",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {code: uberToken}
        };

        $http(req)
            .success(function (data, status, headers, config) {
                $location.path('/dashboard/');
                $location.reload();
            })
            .error(function (data, status, headers, config) {
                alert("Uber access code post failed, status: " + status);
                alert(JSON.stringify(data));
            });
    });
