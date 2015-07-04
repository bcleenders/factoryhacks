var Hapi = require('hapi');
var server = new Hapi.Server();

// Set some server stuff
server.connection({ routes: { cors: true },
    port: 3000
});


// Serve static files (css and js)
server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
        directory: {
            path: 'public/static'
        }
    }
});

// Load the routes
var routes = require('./routes');
// Register the routes to the server
for (var i = 0; i < routes.length; i++) {
    console.log('Registered [' + routes[i].method + '] ' + routes[i].path);
    server.route(routes[i]);
}

// Load the plugins
var plugins = require('./plugins');
for(var name in plugins) {
    console.log('Registered ' + name + " plugin");
    var plug = plugins[name].options ? {register: plugins[name].register, options: plugins[name].options} : plugins[name];
    server.register(plug, function (err) {
        if (err) {
            console.log('Failed loading ' + name + ' plugin: ' + err.toString());
        }
    });
}

// Load the cronjobs
var cronjobs = require('./cronjobs');
for(var name in cronjobs) {
    cronjobs[name].start(server);
}
module.exports = server;
