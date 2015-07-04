'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('DashboardCtrl', function ($scope, $log, $timeout, $state, $sessionStorage, $http) {


        //$scope.control = {};
        $scope.$state = $state;

        $scope.$on('mapInitialized', function (event, map) {
            console.log(map);

            $scope.directionsDisplay = new google.maps.DirectionsRenderer();
            $scope.directionsService = new google.maps.DirectionsService();
            $scope.directionsDisplay.setMap(map);

            var req = {
                method: 'GET',
                url: 'http://localhost:3000/route/' + $sessionStorage.userId,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http(req)
                .success(function (data, status, headers, config) {
                    console.log(data);

                    var waypts = [
                        {
                            location: new google.maps.LatLng(data.departure.location.latitude, data.departure.location.longitude),
                            stopover: true
                        }
                        //,
                        //{
                        //    location: new google.maps.LatLng(data.arrival.location.latitude, data.arrival.location.longitude),
                        //    stopover: true
                        //}
                    ];
                    console.log(waypts);
                    var request = {
                        origin: new google.maps.LatLng(data.departure.location.latitude, data.departure.location.longitude),
                        destination: new google.maps.LatLng(data.arrival.location.latitude, data.arrival.location.longitude),
                        //origin: new google.maps.LatLng(data.originAddress.latitude, data.originAddress.longitude),
                        //destination: new google.maps.LatLng(data.destinationAddress.latitude, data.destinationAddress.longitude),
                        waypoints: waypts,
                        optimizeWaypoints: true,
                        travelMode: google.maps.TravelMode.DRIVING
                    };
                    $scope.directionsService.route(request, function (response, status) {
                        console.log(response);
                        if (status == google.maps.DirectionsStatus.OK) {
                            console.log("Response");

                            console.log(response);
                            $scope.directionsDisplay.setDirections(response);
                            var route = response.routes[0];
                            var summaryPanel = document.getElementById('directions_panel');
                            // For each route, display summary information.
                            for (var i = 0; i < route.legs.length; i++) {
                                var routeSegment = i + 1;
                                $scope.output += '<b>Route Segment: ' + routeSegment + '</b><br>';
                                $scope.output += route.legs[i].start_address + ' to ';
                                $scope.output += route.legs[i].end_address + '<br>';
                                $scope.output += route.legs[i].distance.text + '<br><br>';
                            }

                            //alert($scope.output);
                        }
                    });


                })
                .error(function (data, status, headers, config) {
                    alert("Uber access code post failed, status: " + status);
                    alert(JSON.stringify(data));
                });
        });


        $scope.output = "";


        //alert("User-id: " + $sessionStorage.userId);

    });
