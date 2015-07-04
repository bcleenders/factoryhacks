var handle = function (req, reply) {
    var models = server.plugins.models;

    var id = req.params.user_id;
    console.log(id);
    models.user.findById(id, function (err, user) {
        if (err) return reply(err);

        reply(user.flight);
    });

};

module.exports = {
    handle: handle
};
