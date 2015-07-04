var unirest = require('unirest');
var moment = require('moment');

var getInfo = function(flightNumber, date, callback, failcount) {
    failcount = failcount || 0;

    var m = moment(date);
    var dateString = m.format("YYYY-MM-DD");


    unirest.get('https://api.lufthansa.com/v1/operations/flightstatus/' + flightNumber + '/' + dateString)
        .header("Authorization", "Bearer " + server.plugins.init.access_token)
        .header('Accept', 'application/json')
        .end(function (response) {

            if(! response.ok) {
                console.log('Fetching flight info failed...');
                console.log(response.body);

                if(failcount < 3) {
                    // Retry after 1 second
                    console.log('Retry in 1 second...');
                    setTimeout(function() {
                        getInfo(flightNumber, date, callback, failcount+1);
                    }, 1000);
                } else {
                    console.log('Giving up...');
                }
                return;
            }

            // Extract some info from the response
            var departureAirport = response.body.FlightStatusResource.Flights.Flight.Departure.AirportCode;
            var departureTime = new Date(response.body.FlightStatusResource.Flights.Flight.Departure.ScheduledTimeUTC.DateTime);

            var arrivalAirport = response.body.FlightStatusResource.Flights.Flight.Arrival.AirportCode;
            var arrivalTime = new Date(response.body.FlightStatusResource.Flights.Flight.Arrival.ScheduledTimeUTC.DateTime);

            var info = {
                flightNumber: flightNumber,

                departureAirport: departureAirport,
                departureTime: departureTime,

                arrivalAirport: arrivalAirport,
                arrivalTime: arrivalTime
            };

            callback(info);
        });
};

exports.register = function (server, options, next) {
    server.expose('get', getInfo);
    next();
};

exports.register.attributes = {
    name: 'flightinfo',
    version: '0.0.1'
};
