module.exports = function (mongoose) {
    var Schema = mongoose.Schema;
    var schema = new Schema({
		name: String,
    	access_token: String,
    	refresh_token: String,
        flight: {
          originAddress: {
            address: String,
            latitude: Number,
            longitude: Number
          },
          destinationAddress:{
            address: String,
            latitude: Number,
            longitude: Number
          },
            number: String,
            departure: {
                date: Date,
                location: {
                  address: String,
                  latitude: Number,
                  longitude: Number
                }
            },
            arrival: {
                date: Date,
                location: {
                  address: String,
                  latitude: Number,
                  longitude: Number
                }
            }
        }
    });
    var Model = mongoose.model('User', schema);

    return Model;
};
