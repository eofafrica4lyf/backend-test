const { celebrate: validate } = require('celebrate');
const paramValidation = require('../../api/validations/user.validation');

const privateRoutes = {
	'POST /signup': {
		path: 'UserController.register',
		middlewares: [validate(paramValidation.createUser, { abortEarly: false })]
	},

	'POST /login': 'UserController.login',

	'GET /users': {
		path: 'UserController.getAll',
	}
};

module.exports = privateRoutes;
