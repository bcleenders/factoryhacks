var unirest = require('unirest');
var secrets = require('../secrets');

/*
Requests an access token from the Lufthansa API.

An access token is valid for 1.5 day, so don't keep your server running for more than 1.5 day ;-)
 */
exports.register = function (server, options, next) {
    var postData = {
        client_id: secrets.lufthansa.client_id,
        client_secret: secrets.lufthansa.client_secret,
        grant_type: 'client_credentials'
    };

    unirest.post('https://api.lufthansa.com/v1/oauth/token')
        .header('Accept', 'application/json')
        .send(postData)
        .end(function (response) {
            server.expose('access_token', response.body.access_token);
            next();
        });

};

exports.register.attributes = {
    name: 'init',
    version: '0.0.1'
};
