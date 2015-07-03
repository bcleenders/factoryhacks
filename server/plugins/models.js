var mongoose = require('mongoose');

exports.register = function (server, options, next) {
    mongoose.connect('mongodb://localhost/test');

    // These are the files containing our model definitions
    var modelDefinitions = require('../models');

    // These are the "instantiated" models -> use these for querying etc.
    var models = {
        _mongoose: mongoose
    };

    // Loop over all model definitions, initialize them with bookshelf and add them to the models object
    for(var name in modelDefinitions) {
        models[name.toLowerCase()] = modelDefinitions[name](mongoose);
    }

    // Allow accessing the models through server.plugins.models.<modelname, i.e. 'user'>
    server.expose(models);

    next();
};

exports.register.attributes = {
    name: 'models',
    version: '0.0.1'
};
