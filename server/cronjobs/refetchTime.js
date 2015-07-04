var moment = require('moment');

var refetch = function(server) {
    console.log('Started running...');

    // Find all flights between now and 24 hours from now, and update their expected time of arrival/departure
    server.plugins.models.user.find({
        // Only flights that haven't landed yet
        'flight.arrival.date': {
            $lt: moment().toDate()
        },
        // Only flights that leave after yesterday
        'flight.departure.date': {
            $gt: moment().subtract(10, 'days').toDate()
        }
    }, function(err, result) {
        if(err) {
            console.log("Error:");
            console.log(err);
            return;
        }

        console.log('Found ' + result.length + ' hits');

        for(var i = 0; i < result.length; i++) {
            // Dereference the i
            (function(i) {
                console.log(result[i]);

                var flightNumber = result[i].flight.number;
                var departureDate = result[i].flight.departure.date;

                server.plugins.flightinfo.get(flightNumber, departureDate, function(newInfo) {
                    var changed = false;

                    // More than a minute difference in departure
                    if (Math.abs(moment(result[i].flight.departure.date).diff(moment(newInfo.departureTime))) > 60*1000) {
                        // Update the model
                        result[i].flight.departure.date = newInfo.departureTime;
                        changed = true;
                    }

                    // More than a minute difference in arrival
                    if (Math.abs(moment(result[i].flight.arrival.date).diff(moment(newInfo.arrivalTime))) > 60*1000) {
                        // Update the model
                        result[i].flight.arrival.date = newInfo.arrivalTime;
                        changed = true;
                    }

                    // If you're gonna arrive within the next hour, we should notify Uber!
                    if(moment(result[i].flight.arrival.date).isBefore(moment().add(1, 'hours')) &&
                        moment(result[i].flight.arrival.date).isAfter(moment().add(30, 'minutes'))) {
                        var user = result[i];
                        var params = {
                                        start_latitude: user.flight.arrival.location.latitude,
                                        start_longitude: user.flight.arrival.location.longitude,
                                        end_latitude: user.flight.destinationAddress.latitude,
                                        end_longitude: user.flight.destinationAddress.longitude,
                                        access_token: user.access_token
                                      }
                        server.plugins.uber.request(params,function(err, response){

                        });
                    }

                    // If we updated the records, we should probably update the model
                    if(changed) {
                        result[i].save();
                    }
                });
            })(i);
        }
    });
};

// Run every 10 seconds
// Production would probably run once an hour ;-)
var interval = 10 * 1000;
var start = function(server) {
    setInterval(function() {
        refetch(server);
    }, interval);
};


module.exports = {
    start: start
};
