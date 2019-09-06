const mongoose = require('../../config/mongo-database');
let ObjectId = mongoose.Schema.Types.ObjectId;
const User = require('../models/User');
const Team = require('../models/Team');
const Fixture = require('../models/Fixture');

class Queries {
	constructor(Model) {
		this.Model = Model;
	}

	create(payload) {
		return this.Model.create(payload);
	}

	findAll() {
		return this.Model.find();
	}

	findByIdOrFixtureUrl(id){
		return this.Model.findOne().or([{url: new RegExp(id)},{_id: id}])
	}

	findByHomeTeam(homeTeam) {
		return this.Model.findOne({ homeTeam });
	}

	findByAwayTeam(awayTeam) {
		return this.Model.findOne({ awayTeam });
	}

	findByHomeAndAwayTeams(payload) {
		return this.Model.findOne(payload);
	}

	findByEmail(email) {
		return this.Model.findOne({ email });
	}

	findByName(name) {
		return this.Model.findOne({ name });
	}

	findById(id) {
		return this.Model.findOne({ _id: id });
	}

	removeByName(name) {
		return this.Model.remove({ name });
	}

	removeById(id) {
		return this.Model.deleteOne({ _id: id });
	}

	update(id, payload) {
		return this.Model.updateOne({ _id: id }, payload);
	}
}

const UserQuery = new Queries(User);
const TeamQuery = new Queries(Team);
const FixtureQuery = new Queries(Fixture);

module.exports = {
	UserQuery,
	TeamQuery,
	FixtureQuery
};
