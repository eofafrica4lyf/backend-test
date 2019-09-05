const { Joi } = require('celebrate');

module.exports = {
	// POST /api/v1/public/user/signup
	createUser: {
		body: {
			name: Joi.string()
				.max(200)
				.required(),
			email: Joi.string()
				.email()
				.max(200)
				.required(),
			password: Joi.string()
				.min(6)
				.max(255)
				.required(),
			password2: Joi.string()
				.min(6)
				.max(255)
				.required(),
			isAdmin: Joi.boolean().default(false)
		}
	},
	// POST /api/v1/public/admin/signup
	createAdmin: {
		body: {
			name: Joi.string()
				.max(200)
				.required(),
			email: Joi.string()
				.email()
				.max(200)
				.required(),
			password: Joi.string()
				.min(6)
				.max(255)
				.required(),
			password2: Joi.string()
				.min(6)
				.max(255)
				.required(),
			isAdmin: Joi.boolean().default(true)
		}
	},

	// POST /api/v1/private/add-category
	createCategory: {
		body: {
			name: Joi.string()
				.min(3)
				.max(255)
				.required()
		}
	}
};
