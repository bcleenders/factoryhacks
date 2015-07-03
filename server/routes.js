var routes = [
    {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
          reply('Hello, world!');
        }
    },
    {
        method: ['POST', 'GET'],
        path: '/flight/{flight_id}',
        handler: require('./handelers/flightInfo').handle
    }
];

module.exports = routes;
