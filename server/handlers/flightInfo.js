var unirest = require('unirest');
var secrets = require('../secrets');

var handle = function (req, reply) {

	var name = req.payload.name;
	var flightNumber = req.payload.flightId;
	var originAddress = req.payload.originAddress;
	var destinationAddress = req.payload.destinationAddress;
	var departureDate = req.payload.departureDate;

	var postData = {
		client_id: secrets.lufthansa.client_id,
		client_secret: secrets.lufthansa.client_secret,
		grant_type: 'client_credentials'
	};

	unirest.post('https://api.lufthansa.com/v1/oauth/token')
		.header('Accept', 'application/json')
		.send(postData)
		.end(function (response) {
			access_token = response.body.access_token;
			console.log(access_token);

			unirest.get('https://api.lufthansa.com/v1/operations/flightstatus/' + flightNumber + '/' + departureDate)
				.header("Authorization", "Bearer " + access_token)
				.header('Accept', 'application/json')
				.end(function(response) {
					console.log(response.body);

					console.log(JSON.stringify(response.body, null, 4));

					var departureAirport = response.body.FlightStatusResource.Flights.Flight.Departure.AirportCode;
					var departureTime = new Date(response.body.FlightStatusResource.Flights.Flight.Departure.ScheduledTimeUTC.DateTime);

					var arrivalAirport = response.body.FlightStatusResource.Flights.Flight.Arrival.AirportCode;
					var arrivalTime = new Date(response.body.FlightStatusResource.Flights.Flight.Arrival.ScheduledTimeUTC.DateTime);

					console.log(departureAirport);
					console.log(departureTime);
					console.log(arrivalAirport);
					console.log(arrivalTime);

					var User = server.plugins.models.user;
					var u = new User({
						name: name,
						flights: [{
							number: String,
							originAddress: originAddress,
							departure: {
								date: departureTime,
								location: String
							},
							destinationAddress: destinationAddress,
							arrival: {
								date: arrivalTime,
								location: String
							}
						}]
					});

					u.save();

					reply({userid: u._id});
				});
		});
};

module.exports = {
	handle: handle
};