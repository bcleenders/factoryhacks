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
            destinationAddress: {
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

    schema.pre('save', function (next) {
        var self = this;

        if ((!self.get('flight').originAddress.latitude) && self.get('flight').originAddress.address) {
            server.plugins.geocoder.coder.geocode(self.get('flight').originAddress.address, function (err, res) {
                if (res == null || res.length == 0) {
                    return next();
                }

                self.flight.originAddress.latitude = res[0].latitude;
                self.flight.originAddress.longitude = res[0].longitude;

                next();
            });
        } else {
            next();
        }
    });

    schema.pre('save', function (next) {
        var self = this;

        if ((!self.get('flight').destinationAddress.latitude) && self.get('flight').destinationAddress.address) {
            server.plugins.geocoder.coder.geocode(self.get('flight').destinationAddress.address, function (err, res) {
                if (res == null || res.length == 0) {
                    return next();
                }

                self.flight.destinationAddress.latitude = res[0].latitude;
                self.flight.destinationAddress.longitude = res[0].longitude;

                next();
            });
        } else {
            next();
        }
    });

    schema.pre('save', function (next) {
        var self = this;

        if ((!self.get('flight').arrival.location.latitude) && self.get('flight').arrival.location.address) {
            server.plugins.geocoder.coder.geocode(self.get('flight').arrival.location.address, function (err, res) {
                if (res == null || res.length == 0) {
                    return next();
                }

                self.flight.arrival.location.latitude = res[0].latitude;
                self.flight.arrival.location.longitude = res[0].longitude;

                next();
            });
        } else {
            next();
        }
    });

    schema.pre('save', function (next) {
        var self = this;

        if ((!self.get('flight').departure.location.latitude) && self.get('flight').departure.location.address) {
            server.plugins.geocoder.coder.geocode(self.get('flight').departure.location.address, function (err, res) {
                if (res == null || res.length == 0) {
                    return next();
                }

                self.flight.departure.location.latitude = res[0].latitude;
                self.flight.departure.location.longitude = res[0].longitude;

                next();
            });
        } else {
            next();
        }
    });

    var Model = mongoose.model('User', schema);

    return Model;
};
