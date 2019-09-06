const mongoose = require('../../config/mongo-database');
let ObjectId = mongoose.Schema.Types.ObjectId;
const uuid = require('uuid');

const fixtureSchema = new mongoose.Schema({
	dateTime: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 250,
		default: new Date()
	},
	referee: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255
	},
	score: {
		type: String,
		required: true,
		default: '0-0'
	},
	homeTeam: {
		type: ObjectId,
		ref: 'Team',
		required: true
	},
	awayTeam: {
		type: ObjectId,
		ref: 'Team',
		required: true
	},
	status: {
		type: String,
		enum: ['pending', 'completed', 'cancelled'],
		default: 'pending'
	},
	url: {
		type: String,
		//uuid created formatted and truncated to length of a typical Object Id
		default:
			`localhost/fixture/` +
			`${uuid.v4()}`
				.replace(/-/g, '')
				.split('')
				.splice(0, 24)
				.join('')
	}
});

const Fixture = mongoose.model('Fixture', fixtureSchema);

module.exports = Fixture;
