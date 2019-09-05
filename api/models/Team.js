const mongoose = require('../../config/mongo-database');

const teamSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	stadium: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	coach: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024
	}
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
