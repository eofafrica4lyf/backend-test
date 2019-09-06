const { celebrate: validate } = require('celebrate');
const IsAdmin = require('../../api/middleware/IsAdmin');
const teamValidation = require('../../api/validations/team.validation');
const fixtureValidation = require('../../api/validations/fixture.validation');

const privateRoutes = {
	'POST /team/create': {
		path: 'TeamController.create',
		middlewares: [validate(teamValidation.createTeam), IsAdmin]
	},
	'GET /team/view/:id': {
		path: 'TeamController.view'
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
	},

	'POST /fixture/create': {
		path: 'FixtureController.create',
		middlewares: [validate(fixtureValidation.createFixture), IsAdmin]
	},
	'GET /fixture/view/:id': {
		path: 'FixtureController.view',
		middlewares: [IsAdmin]
	},
	'GET /fixtures/': {
		path: 'FixtureController.viewAll',
		middlewares: [IsAdmin]
	},
	'PUT /fixture/update/:id': {
		path: 'FixtureController.update',
		middlewares: [IsAdmin]
	},
	'DELETE /fixture/remove/:id': {
		path: 'FixtureController.remove',
		middlewares: [IsAdmin]
	}


};

module.exports = privateRoutes;
