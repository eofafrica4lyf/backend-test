const request = require('supertest');
// const { beforeAction, afterAction } = require('../setup/_setup');
const User = require('../../api/models/User');
// const UserQuery = require('../../api/queries/user.queries');
const {
	beforeAction,
	removeAllCollections,
	dropAllCollections,
	closeMongooseConnection,
	mongooseConnect
} = require('../setup/test-setup');

// let api = beforeAction()
// 	.then(res => {
// 		console.log('Express instance');
// 		return;
// 	})
// 	.catch(error => console.log(error));

// Setup a Test Database
let api;
let databaseName = 'test-virtual-premer-league';
let dbConnection;
beforeAll(async () => {
	api = await beforeAction();
	await mongooseConnect(databaseName);
	console.log('beforeAll done');
	// return;
});

// Cleans up database between each test
afterEach(async () => {
	await removeAllCollections();
	console.log('afterEach done');
	// return;
});

// Disconnect Mongoose
afterAll(async () => {
	await dropAllCollections();
	await closeMongooseConnection();
	console.log('afterAll done');
	// setTimeout(() => process.exit(), 1000)
});

// let ADMIN_ACCOUNT;

// beforeAll(async () => {
//   ADMIN_ACCOUNT = await User.create({
// 		name: 'Martin Luke',
// 		email: 'martinking@mail.com',
// 		password: 'securepassword',
// 		password2: 'securepassword',
// 		phone: '09057367323',
// 		user_type: 'admin'
// 	});
// })

// beforeAll(async () => {
//   // api = await beforeAction();

//   console.log(process.env.NODE_ENV);

// 	ADMIN_ACCOUNT = await User.create({
// 		name: 'Martin Luke',
// 		email: 'martinking@mail.com',
// 		password: 'securepassword',
// 		password2: 'securepassword',
// 		phone: '09057367323',
// 		user_type: 'admin'
// 	});
// });

// afterAll(async () => {
// 	await User.deleteOne({email: 'martinking@mail.com'});
// 	// afterAction();
// });

describe('User SIgnup', () => {
	test('User | Signup | create successfully', async done => {
		const { body } = await request(api)
			.post('/public/signup')
			.set('Accept', /json/)
			.send({
				name: 'Martin Luke',
				email: 'martinluther@mail.com',
				password: 'securepassword',
				password2: 'securepassword',
				user_type: 'user'
			})
			.expect(200);
		// console.log('body', body);

		expect(body.payload).toBeTruthy();

		const user = await User.findOne({ email: body.payload.email });

		expect(user.id).toBe(body.payload._id);
		expect(user.email).toBe(body.payload.email);

		// await user.destroy();
		// console.log('done');

		done();
	});
});

test('User | Signup | passwords do not match', async () => {
	await User.create({
		name: 'Martin Luke',
		email: 'martinluther@mail.com',
		password: 'securepassword',
		password2: 'securepassword',
		user_type: 'user'
	});

	const { body } = await request(api)
		.post('/public/signup')
		.set('Accept', /json/)
		.send({
			name: 'Martin Luke',
			email: 'martinluther@mail.com',
			password: 'securepassword',
			password2: 'securepassword1',
			user_type: 'user'
		})
		.expect(200);

	expect(body.payload).toEqual({});
	expect(body.statusCode).toBe(400);
	expect(body.message).toBe('Passwords do not match');
});

test('User | Signup | user already exists', async () => {
	await User.create({
		name: 'Martin Luke',
		email: 'martinluther@mail.com',
		password: 'securepassword',
		password2: 'securepassword',
		user_type: 'user'
	});

	const { body } = await request(api)
		.post('/public/signup')
		.set('Accept', /json/)
		.send({
			name: 'Martin Luke',
			email: 'martinluther@mail.com',
			password: 'securepassword',
			password2: 'securepassword',
			user_type: 'user'
		})
		.expect(200);

	expect(body.payload).toEqual({});
	expect(body.statusCode).toBe(400);
	expect(body.message).toBe('email has been taken');

});
