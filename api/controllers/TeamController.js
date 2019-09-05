const httpStatus = require('http-status');
const sendResponse = require('../../helpers/response');
const { TeamQuery } = require('../queries/queries');

const TeamController = () => {
	const create = async (req, res, next) => {
		try {
			const { name, stadium, coach } = req.body;

			const teamExist = await TeamQuery.findByName(name);

			if (teamExist) {
				return res.json(
					sendResponse(
						httpStatus.BAD_REQUEST,
						'team name has already been registered',
						{},
						{ email: 'team name has already been registered' }
					)
				);
			}
			const teamObject = {
				name,
				stadium,
				coach
			};

			const team = await TeamQuery.create(teamObject);
			return res.json(sendResponse(httpStatus.OK, 'success', team, null));
		} catch (err) {
			next(err);
		}
  };
  
  const view = async (req,res,next) => {
    try {
      const {id} = req.params;

      const teamExist = await TeamQuery.findById(id);

			if (!teamExist) {
				return res.json(
					sendResponse(
						httpStatus.BAD_REQUEST,
						'team does not exist',
						{},
						{ email: 'team does not exist' }
					)
				);
			}

			return res.json(sendResponse(httpStatus.OK, 'success', teamExist, null));      
    } catch (err) {
      next(err);
    }
  }

  const viewAll = async (req,res,next) => {
    try {
      const allTeams = await TeamQuery.findAll();

			return res.json(sendResponse(httpStatus.OK, 'success', allTeams, null));      
    } catch (err) {
      next(err);
    }
  }

	const remove = async (req, res, next) => {
		try {
			const { id } = req.params;

			const teamExist = await TeamQuery.findById(id);

			if (!teamExist) {
				return res.json(
					sendResponse(
						httpStatus.BAD_REQUEST,
						'team does not exist',
						{},
						{ email: 'team does not exist' }
					)
				);
			}

			const teamDelete = await TeamQuery.removeById(id);

			return res.json(sendResponse(httpStatus.OK, 'success', teamDelete, null));
		} catch (err) {
			next(err);
		}
	};

	const update = async (req, res, next) => {
		try {
      const {id} = req.params;
			const info = req.body;

			const teamExist = await TeamQuery.findById(id);

			if (!teamExist) {
				return res.json(
					sendResponse(
						httpStatus.BAD_REQUEST,
						'team does not exist',
						{},
						{ email: 'team does not exist' }
					)
				);
			}

			const teamUpdate = await TeamQuery.update(id, info);
			return res.json(sendResponse(httpStatus.OK, 'success', teamUpdate, null));
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

module.exports = TeamController;
