module.exports = function(mongoose) {
	var Model = mongoose.model('User', {
		username: String,
    name: String
	});

	return Model;
};
