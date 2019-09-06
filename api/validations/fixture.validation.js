const { Joi } = require('celebrate');

module.exports = {
	// POST /api/v1/public/fixture/create
	createFixture: {
		body: {
			referee: Joi.string()
				.max(200)
				.required(),
			score: Joi.string()
				.email()
				.max(200)
				.default('0-0'),
			homeTeam: Joi.string()
				.min(6)
				.max(255)
				.required(),
			awayTeam: Joi.string()
				.min(6)
				.max(255)
				.required(),
			status: Joi.string().max(10),
			dateTime: Joi.string().default(new Date())
		}
	},
};
