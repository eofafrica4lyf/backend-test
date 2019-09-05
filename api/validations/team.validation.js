const { Joi } = require('celebrate');

module.exports = {
	// POST /api/v1/private/team/create
	createTeam: {
		body: {
			name: Joi.string()
				.max(200)
				.required(),
			coach: Joi.string()
				.max(200)
				.required(),
			stadium: Joi.string()
				.min(6)
				.max(255)
				.required()
		}
	}
};
