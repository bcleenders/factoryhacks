'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location, $window) {

    $scope.submit = function() {
      alert($scope.name);

      $location.path('/dashboard');

      //$window.location.href = 'https://login.uber.com/oauth/authorize';
      return false;
    }

  });
