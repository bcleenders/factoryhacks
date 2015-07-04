'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('DashboardCtrl', function ($scope, $log, $timeout, $state, $sessionStorage) {


        //$scope.control = {};
        $scope.$state = $state;

        $scope.$on('mapInitialized', function (event, map) {
            console.log(map);

            $scope.directionsDisplay = new google.maps.DirectionsRenderer();
            $scope.directionsService = new google.maps.DirectionsService();

            $scope.directionsDisplay.setMap(map);

            var waypts = [{location: "montreal, quebec", stopover: true}, {location: "toronto, ont", stopover: true}];
            var request = {
                origin: "Halifax, NS",
                destination: "Boston, MA",
                waypoints: waypts,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING
            };
            $scope.directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
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

        });


        $scope.output = "";


        //alert("User-id: " + $sessionStorage.userId);

    });
