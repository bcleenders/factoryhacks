var Uber = require('node-uber');
var secrets = require('../secrets');
var request = require('request');

function Requests(uber) {
  this._uber = uber;
  this.path = 'requests';
}

Uber.prototype.post = function (options, callback) {
  if (!options.version) {
    options.version = 'v1'
  }

  var url = this.defaults.base_url + options.version + '/' + options.url;
  headers = {}
  if (options.access_token) {
    headers = {'Authorization': "Bearer " + options.access_token}
  }

  request.post({
    url: url,
    headers: headers,
    json: true,
    body: options.params
  }, function (err, data, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });

  return this;
};

Requests.prototype.make = function (query, callback) {
  if (!query.access_token) {
    accessToken = this._uber.access_token;
  } else {
    accessToken = query.access_token;
  }

  if (!accessToken) {
    callback(new Error('Invalid access token'));
    return this;
  }

  delete query.access_token;

  if (!query.product_id && !query.start_latitude && !query.start_longitude && !query.end_latitude && !query.end_longitude) {
    return callback(new Error('Invalid parameters'));
  }
  return this._uber.post({ url: this.path, params: query, access_token: accessToken}, callback);
};

exports.register = function (server, options, next) {
  var uber = new Uber(secrets.uber);
  uber.requests = new Requests(uber);
  uber.defaults.base_url = 'https://sandbox-api.uber.com/'

  uber.request = function(query, callback){
    if (!query.start_latitude && !query.start_longitude && !query.end_latitude && !query.end_longitude) {
      return callback(new Error('Invalid parameters'));
    }
    query.drivers_available = true;
    var self = this;
    // self.products.list({ latitude: query.start_latitude, longitude: query.start_longitude, drivers_available: true}, function (err, res) {
    //   if (err) return callback(err, null);
    //   query.product_id = res.products[0].product_id;
    //   self.requests.make(query, callback);
    // });
    response = {
       "request_id": "852b8fdd-4369-4659-9628-e122662ad257",
       "status": "processing",
       "vehicle": null,
       "driver": null,
       "location": null,
       "eta": 5,
       "surge_multiplier": null
    }
    callback(null, response)
  }
  server.expose(uber);
};

exports.register.attributes = {
    name: 'uber',
    version: '0.0.1'
};
