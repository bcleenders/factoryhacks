var unirest = require('unirest');
var secrets = require('../secrets');

var handle = function (req, reply) {

	var flightNumber = req.params.flight_id;
	var departureDate = req.params.departureDate;

	flightNumber = 'DLH1041';
	departureDate = '2015-07-02';

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

			unirest.get('https://api.lufthansa.com/v1/operations/flightstatus/' + flightNumber + '/' + departureDate)
				.header("Authorization", "Bearer " + access_token)
				.header('Accept', 'application/json')
				.end(function(response) {
					console.log(response);
				});
		});
};

module.exports = {
	handle: handle
};