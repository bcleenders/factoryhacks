var unirest = require('unirest');
var moment = require('moment');

var getInfo = function(airportCode, callback, failcount) {
    failcount = failcount || 0;

    console.log('AAAAAA');

    unirest.get('https://api.lufthansa.com/v1/references/airports/' + airportCode)
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
                        getInfo(airportCode, callback, failcount+1);
                    }, 1000);
                } else {
                    console.log('Giving up...');
                }
                return;
            }

            // Extract some info from the response
            var latitude = response.body.AirportResource.Airports.Airport.Position.Coordinate.Latitude;
            var longitude = response.body.AirportResource.Airports.Airport.Position.Coordinate.Longitude;

            var info = {
                latitude: latitude,
                longitude: longitude
            };

            callback(info);
        });
};

exports.register = function (server, options, next) {
    server.expose('get', getInfo);
    next();
};

exports.register.attributes = {
    name: 'airportinfo',
    version: '0.0.1'
};
