module.exports = function (mongoose) {
    var Schema = mongoose.Schema;
    var schema = new Schema({
		name: String,
    	access_token: String,
    	refresh_token: String,
        flights: [{
            number: String,
            departure: {
                date: Date,
                location: String
            },
            arrival: {
                date: Date,
                location: String
            }
        }]
    });
    var Model = mongoose.model('User', schema);

    return Model;
};
