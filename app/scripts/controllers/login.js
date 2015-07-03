'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('LoginCtrl', function ($scope, $location, $window, $sessionStorage, $http) {

        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events =
            [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

        $scope.getDayClass = function (date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        };


        $scope.submit = function () {
            // do post to api

            $scope.userId = 0;

            var user = {
                name: $scope.name,
                flightId: $scope.flight,
                departureDate: $scope.departureDate,
                originAddress: $scope.origin,
                destinationAddress: $scope.destination
            };

            alert(JSON.stringify(user));
            //var users = Restangular.all('users');
            //
            //users.post(user).then(function (newUser) {
            //    alert(newUser)
            //});

            var req = {
                method: 'POST',
                url: 'http://localhost:3000/flight',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: user
            };


            $http(req)
                .success(function (data, status, headers, config) {
                    alert("succes");
                    alert(data)
                })
                .error(function (data, status, headers, config) {
                    alert(status);
                    alert(data);
                });

            //$sessionStorage.userId = 1;
            //alert($sessionStorage.userId);

            var redirect = encodeURIComponent("http://localhost:8000/dashboard");
            var uber = "https://login.uber.com/oauth/authorize?client_id=uZ6Lb6oZoEnJjQVkV6btgdpXgylHSXED&response_type=code&redirect_uri=" + redirect;
            //$location.path('/dashboard');
            //alert(redirect);

            //$window.location.href = uber;
            return false;
        }

    });
