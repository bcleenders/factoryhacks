var routes = [
    {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
          reply('Hello, world!');
        }
    },
    {
        method: 'POST',
        path: '/flight/{flight_id}',
        handler: require('./handlers/flightInfo').handle
    }
];

module.exports = routes;
