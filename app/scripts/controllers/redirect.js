'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('RedirectCtrl', function ($scope, $state, $stateParams, $location) {

        $scope.$state = $state;

        // Post uber access token to the backend
        var uberToken = $stateParams.code;
        alert(uberToken);

        // Redirect to dashboard
        $location.path('/dashboard/');
        $location.reload();
        //return false;
    });
