exports.register = function (server, options, next) {

  var geocoderProvider = 'google';
  var httpAdapter = 'http';
  // optionnal
  // var extra = {
  //     apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
  //     formatter: null         // 'gpx', 'string', ...
  // };
  var extra={};

  var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);


    // Allow accessing the models through server.plugins.models.<modelname, i.e. 'user'>
    server.expose("coder", geocoder);

    next();
};

exports.register.attributes = {
    name: 'geocoder',
    version: '0.0.1'
};
