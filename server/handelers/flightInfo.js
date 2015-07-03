var unirest = require('unirest');
var secrets = require('../secrets');

var handle = function (req, reply) {
	var url = 'https://api.lufthansa.com/v1/oauth/token';

	console.log("Your posted for flight id ");
	console.log(req.params.flight_id);

	var postData = {
		client_id: secrets.lufthansa.client_id,
		client_secret: secrets.lufthansa.client_secret,
		grant_type: 'client_credentials'
	};

	unirest.post('https://api.lufthansa.com/v1/oauth/token')
		.header('Accept', 'application/json')
		.send(postData)
		.end(function (response) {
			console.log(response);

			access_token = response.body.access_token;
			expires_at = now + response.body.expires_in;


		});
};

module.exports = {
	handle: handle
};