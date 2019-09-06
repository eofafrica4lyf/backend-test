const JWTService = require('../services/auth.service');
// let client = require('redis').createClient();

module.exports = async (req, res, next) => {
	let tokenToVerify;

	if (req.header('Authorization')) {
		const parts = req.header('Authorization').split(' ');

		if (parts.length === 2) {
			const scheme = parts[0];
			const credentials = parts[1];
			const a = await client.hgetall(credentials+"j");
			console.log('6yhjkoiudjwlfwpoifjhf', a);

			if (/^Bearer$/.test(scheme)) {
				tokenToVerify = credentials;
			} else {
				return res
					.status(401)
					.json({ msg: 'Format for Authorization: Bearer [token]' });
			}
		} else {
			return res
				.status(401)
				.json({ msg: 'Format for Authorization: Bearer [token]' });
		}
	} else if (req.body.token) {
		tokenToVerify = req.body.token;
		delete req.query.token;
	} else {
		return res.status(401).json({ msg: 'No Authorization was found' });
	}

	return JWTService().verify(tokenToVerify, (err, thisToken) => {
		if (err) return res.status(401).json({ err });
		req.token = thisToken;
		return next();
	});
};
