const { celebrate: validate } = require('celebrate');
const IsAdmin = require('../../api/middleware/IsAdmin');

const privateRoutes = {
	'GET /users': {
		path: 'UserController.getAll',
		middlewares: [IsAdmin]
	}

	// 'POST /create-team': {
	// 	path: 'AgencyProfileController.createProfile',
	// 	middlewares: [
	// 		validate(profileValidation.createProfile, { abortEarly: false })
	// 	]
	// }
};

module.exports = privateRoutes;
