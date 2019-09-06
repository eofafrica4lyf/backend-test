let client = require('redis').createClient();

// var limiter = require('express-limiter')(app, client)
const setTokenInRedis = (token, id) => {
	return Promise.resolve(client.hmset(token, id));
};
const getTokenFromRedis = token => {
	return client.hgetall(token, (error, reply) => {
		if (error || !reply) {
			return null;
		}
		console.log(reply);
		return reply;
	});
};
module.exports = { setTokenInRedis, getTokenFromRedis };
