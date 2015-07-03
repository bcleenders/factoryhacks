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
    },
    {
        method: 'POST',
        path: '/uber/{user_id}/authenticate',
        handler: require('./handlers/uber').authenticate
    }
];

module.exports = routes;
