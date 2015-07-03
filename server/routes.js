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
        path: '/flight',
        handler: require('./handlers/flightInfo').handle
    },
    {
        method: ['POST', 'GET'],
        path: '/getTimes',
        handler: require('./handlers/getTimes').handle
    }
];

module.exports = routes;
