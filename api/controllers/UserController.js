const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const httpStatus = require('http-status');
const sendResponse = require('../../helpers/response');
const { UserQuery } = require('../queries/queries');
// let client = require('redis').createClient();
// const {
// 	setTokenInRedis,
// 	getTokenFromRedis
// } = require('../../helpers/setTokenInRedis');

const UserController = () => {
	const register = async (req, res, next) => {
		try {
			let { name, email, password, password2, isAdmin } = req.body;

			if (password !== password2) {
				return res.json(
					sendResponse(
						httpStatus.BAD_REQUEST,
						'Passwords do not match',
						{},
						{ password: 'passwords do not match' }
					)
				);
			}

			const userExist = await UserQuery.findByEmail(email);

			if (userExist) {
				return res.json(
					sendResponse(
						httpStatus.BAD_REQUEST,
						'email has been taken',
						{},
						{ email: 'email has been taken' }
					)
				);
			}
			const userObject = {
				name,
				email,
				password,
				isAdmin
			};

			userObject.password = bcryptService().hashPassword(userObject);
			const user = await UserQuery.create(userObject);

			return res.json(sendResponse(httpStatus.OK, 'success', user, null));
		} catch (err) {
			next(err);
		}
	};

	// let limiter = require('express-limiter')(app, client)
	const setTokenInRedis = (token, id) => {
		return Promise.resolve(client.hmset(token, id));
	};

	const login = async (req, res, next) => {
		try {
			const { email, password } = req.body;

			const user = await UserQuery.findByEmail(email);
			if (!user) {
				return res.json(
					sendResponse(
						httpStatus.NOT_FOUND,
						'User does not exist',
						{},
						{ error: 'User does not exist' }
					)
				);
			}
			const userInfo = {
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin
			};

			if (bcryptService().comparePassword(password, user.password)) {
				// to issue token with the user object, convert it to JSON
				const token = authService().issue(userInfo);


						return res.json(
							sendResponse(httpStatus.OK, 'success', userInfo, null, token)
						);
					
			}

			return res.json(
				sendResponse(
					httpStatus.BAD_REQUEST,
					'invalid email or password',
					{},
					{ error: 'invalid email or password' }
				)
			);
		} catch (err) {
			next(err);
		}
	};

	return {
		register,
		login
	};
};

module.exports = UserController;
