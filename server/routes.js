var routes = [
    {
        method: 'GET',
        path: '/route/{user_id}',
        handler: require('./handlers/route').handle
    },
    {
        method: ['POST', 'GET'],
        path: '/flight',
        handler: require('./handlers/flightInfo').handle
    },
    {
        method: 'POST',
        path: '/uber/{user_id}/authenticate',
        handler: require('./handlers/uber').authenticate
    }
];

module.exports = routes;
