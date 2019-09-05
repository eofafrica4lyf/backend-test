const User = require('../models/User');
const Team = require('../models/Team');

class Queries {
	constructor(Model) {
		this.Model = Model;
	}

	create(payload) {
		return this.Model.create(payload);
	}
	
	findAll(){
		return this.Model.find();
		
	}

	findByEmail(email) {
		return this.Model.findOne({ email });
	}

	findByName(name){
		return this.Model.findOne({name});
	}

	findById(id){
		return this.Model.findOne({_id: id});
	}

	removeByName(name){
		return this.Model.remove({name});
	}

	removeById(id){
		return this.Model.deleteOne({_id: id});
	}

	update(id, payload){
		return this.Model.updateOne({_id: id}, payload)
	}

	// findById(id) {
	// 	return this.Model.findOne({ where: { id } });
	// }

	// update(payload, where) {
	// 	return this.Model.update(payload, where);
	// }
}

const UserQuery = new Queries(User);
const TeamQuery = new Queries(Team);

module.exports = {UserQuery, TeamQuery};
