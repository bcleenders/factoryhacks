var good = require('good')
exports.register = good;
exports.options = {
  requestPayload: true,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*', error: '*', request: '*', tail: '*' }
    }]
};
