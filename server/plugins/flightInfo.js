var unirest = require('unirest');

var getInfo = function(flightNumber, departureDate, callback) {
    unirest.get('https://api.lufthansa.com/v1/operations/flightstatus/' + flightNumber + '/' + departureDate)
        .header("Authorization", "Bearer " + server.plugins.init.access_token)
        .header('Accept', 'application/json')
        .end(function (response) {

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
