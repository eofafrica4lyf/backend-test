const { celebrate: validate } = require('celebrate');
const IsAdmin = require('../../api/middleware/IsAdmin');
const teamValidation = require('../../api/validations/team.validation');

const privateRoutes = {
	'POST /team/create': {
		path: 'TeamController.create',
		middlewares: [validate(teamValidation.createTeam), IsAdmin]
	},
	'GET /team/view/:id': {
		path: 'TeamController.view',
		middlewares: [IsAdmin]
	},
	'GET /teams/': {
		path: 'TeamController.viewAll',
		middlewares: [IsAdmin]
	},
	'PUT /team/update/:id': {
		path: 'TeamController.update',
		middlewares: [IsAdmin]
	},
	'DELETE /team/remove/:id': {
		path: 'TeamController.remove',
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
