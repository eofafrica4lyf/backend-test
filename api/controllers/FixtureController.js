const httpStatus = require('http-status');
const sendResponse = require('../../helpers/response');
const { FixtureQuery } = require('../queries/queries');

const FixtureController = () => {
	const create = async (req, res, next) => {
		try {
			const { referee, homeTeam, awayTeam, score, dateTime } = req.body;
			console.log('req.body', req.body);

			const fixtureExist = await FixtureQuery.findByHomeAndAwayTeams({
				homeTeam,
				awayTeam
			});
			console.log(fixtureExist);

			if (fixtureExist) {
				return res.json(
					sendResponse(
						httpStatus.BAD_REQUEST,
						'fixture already exists',
						{},
						{ email: 'fixture already exists' }
					)
				);
			}
			const fixtureObject = {
				referee,
				homeTeam,
				awayTeam,
				score,
				dateTime
			};

			const team = await FixtureQuery.create(fixtureObject);
			return res.json(sendResponse(httpStatus.OK, 'success', team, null));
		} catch (err) {
			next(err);
		}
	};

	const view = async (req, res, next) => {
		try {
			const { id } = req.params;

			// const fixtureExist = await FixtureQuery.findById(id).populate([
			// 	{ path: 'homeTeam', select: 'name stadium coach' },
			// 	{ path: 'awayTeam', select: 'name coach' }
			// ]);
			const fixtureExist = await FixtureQuery.findByIdOrFixtureUrl(id).populate([
				{ path: 'homeTeam', select: 'name stadium coach' },
				{ path: 'awayTeam', select: 'name coach' }
			]);

			if (!fixtureExist) {
				return res.json(
					sendResponse(
						httpStatus.BAD_REQUEST,
						'fixture does not exist',
						{},
						{ email: 'fixture does not exist' }
					)
				);
			}

			return res.json(
				sendResponse(httpStatus.OK, 'success', fixtureExist, null)
			);
		} catch (err) {
			next(err);
		}
	};

	const viewAll = async (req, res, next) => {
		try {
			const allFixtures = await FixtureQuery.findAll().populate([
				{ path: 'homeTeam', select: 'name stadium coach' },
				{ path: 'awayTeam', select: 'name coach' }
			]);;

			return res.json(
				sendResponse(httpStatus.OK, 'success', allFixtures, null)
			);
		} catch (err) {
			next(err);
		}
	};

	const remove = async (req, res, next) => {
		try {
			const { id } = req.params;

			const fixtureExist = await FixtureQuery.findById(id);

			if (!fixtureExist) {
				return res.json(
					sendResponse(
						httpStatus.BAD_REQUEST,
						'fixture does not exist',
						{},
						{ email: 'fixture does not exist' }
					)
				);
			}

			const fixtureDelete = await FixtureQuery.removeById(id);

			return res.json(sendResponse(httpStatus.OK, 'success', fixtureDelete, null));
		} catch (err) {
			next(err);
		}
	};

	const update = async (req, res, next) => {
		try {
	    const {id} = req.params;
			const info = req.body;

			const fixtureExist = await FixtureQuery.findById(id);

			if (!fixtureExist) {
				return res.json(
					sendResponse(
						httpStatus.BAD_REQUEST,
						'team does not exist',
						{},
						{ email: 'team does not exist' }
					)
				);
			}

			const fixtureUpdate = await FixtureQuery.update(id, info);
			return res.json(sendResponse(httpStatus.OK, 'success', fixtureUpdate, null));
		} catch (err) {
			next(err);
		}
	};

	return {
		create,
		view,
		viewAll,
		remove,
		update
	};
};

module.exports = FixtureController;
