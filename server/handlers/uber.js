var Uber = require('node-uber');
var secrets = require('../secrets');

var authenticate = function (req, reply) {
  var models = server.plugins.models;
  var uber = new Uber(secrets.uber);
  var code = req.payload.code;
  var id = req.params.user_id;
  uber.authorization({authorization_code: code}, function (err, at, rt) {
    if(err) return reply(err);
    var access_token = at;
    var refresh_token = rt;
    models.user.findById(id, function(err, user){
      if(err) return reply(err);
      user.access_token = access_token;
      user.refresh_token = refresh_token;
      user.save(function(err, u){
        if(err) return reply(err);
        reply({message: "User Authenticated"});
      })
    })
  });
}

module.exports = {
  authenticate: authenticate
};
