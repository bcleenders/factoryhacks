var unirest = require('unirest');
var secrets = require('../secrets');

/*
 Creates a user

 To test:
 curl -X POST -H "Cache-Control: no-cache" --data "flightId=LH400&departureDate=2015-07-02" http://localhost:3000/flight
 */
var handle = function (req, reply) {

    var name = req.payload.name;
    var flightNumber = req.payload.flightId;
    var originAddress = req.payload.originAddress;
    var destinationAddress = req.payload.destinationAddress;
    var departureDate = new Date(req.payload.departureDate);

    req.server.plugins.flightinfo.get(flightNumber, departureDate, function (info) {
        // Log that s***!
        console.log('Departure airport: ' + info.departureAirport);
        console.log('Departure datetime: ' + info.departureTime);
        console.log('Arrival airport: ' + info.arrivalAirport);
        console.log('Arrival datetime: ' + info.arrivalTime);

        req.server.plugins.airportinfo.get(info.departureAirport, function (departLocation) {
            req.server.plugins.airportinfo.get(info.arrivalAirport, function (arriveLocation) {

                // Create a new user object (Mongoose)
                var User = server.plugins.models.user;

                var u = new User({
                    name: name,
                    flight: {
                        number: flightNumber,
                        originAddress: {address: originAddress},
                        departure: {
                            date: info.departureTime,
                            location: {
                                address: info.departureAirport,
                                latitude: departLocation.latitude,
                                longitude: departLocation.longitude
                            }
                        },
                        destinationAddress: {address: destinationAddress},
                        arrival: {
                            date: info.arrivalTime,
                            location: {
                                address: info.arrivalAirport,
                                latitude: arriveLocation.latitude,
                                longitude: arriveLocation.longitude
                            }
                        }
                    }
                });

                // Save the user
                u.save(function (err, s) {
                    if (!err) {
                        reply({userid: u._id});
                    } else {
                        reply('Could not save info').code(400)
                    }
                });
            });
        });
    });
};

module.exports = {
    handle: handle
};
