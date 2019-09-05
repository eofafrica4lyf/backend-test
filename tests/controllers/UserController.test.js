const request = require('supertest');
const bcryptService = require('../../api/services/bcrypt.service');
const User = require('../../api/models/User');
const {
	beforeAction,
	removeAllCollections,
	dropAllCollections,
	closeMongooseConnection,
	mongooseConnect
} = require('../setup/test-setup');

// Setup a Test Database
let api;
let databaseName = 'test-virtual-premer-league';
let dbConnection;
beforeAll(async () => {
	api = await beforeAction();
	await mongooseConnect(databaseName);
});

// Cleans up database between each test
afterEach(async () => {
	await removeAllCollections();
});

// Disconnect Mongoose
afterAll(async () => {
	await dropAllCollections();
	await closeMongooseConnection();
});

describe('User Signup', () => {
	test('User | Signup | create successfully', async done => {
		const { body } = await request(api)
			.post('/public/user/signup')
			.set('Accept', /json/)
			.send({
				name: 'Martin Luke',
				email: 'martinluther@gmail.com',
				password: 'securepassword',
				password2: 'securepassword'
			});

		expect(body.statusCode).toBe(200);
		expect(body.payload).toBeTruthy();

    const user = await User.findOne({ email: body.payload.email });

		expect(user.id).toBe(body.payload._id);
		expect(user.email).toBe(body.payload.email);
		expect(user.isAdmin).toBe(false);

		done();
	});

	test('User | Signup | passwords do not match', async () => {
		await User.create({
			name: 'User user',
			email: 'user@gmail.com',
			password: 'securepassword',
			isAdmin: false
		});

		const { body } = await request(api)
			.post('/public/user/signup')
			.set('Accept', /json/)
			.send({
				name: 'User user',
				email: 'user@gmail.com',
				password: 'securepassword',
				password2: 'securepassword1'
			});

		expect(body.payload).toEqual({});
		expect(body.statusCode).toBe(400);
		expect(body.message).toBe('Passwords do not match');
	});

	test('User | Signup | user already exists', async () => {
		await User.create({
			name: 'User user',
			email: 'user@gmail.com',
			password: 'securepassword',
			isAdmin: false
		});

		const { body } = await request(api)
			.post('/public/user/signup')
			.set('Accept', /json/)
			.send({
				name: 'User user',
				email: 'user@gmail.com',
				password: 'securepassword',
				password2: 'securepassword'
			});

		expect(body.payload).toEqual({});
		expect(body.statusCode).toBe(400);
		expect(body.message).toBe('email has been taken');
	});
});

describe('Admin Signup', () => {
	test('Admin | Signup | create successfully', async done => {
		const { body } = await request(api)
			.post('/public/admin/signup')
			.set('Accept', /json/)
			.send({
				name: 'Admin admin',
				email: 'admin@gmail.com',
				password: 'securepassword',
				password2: 'securepassword'
			});

		expect(body.statusCode).toBe(200);
		expect(body.payload).toBeTruthy();

		const user = await User.findOne({ email: body.payload.email });

		expect(user.id).toBe(body.payload._id);
		expect(user.email).toBe(body.payload.email);
		expect(user.isAdmin).toBe(true);
		done();
	});
});

describe('User Login', () => {

	beforeEach(async () => {
		//Signup a user
		let user = {
			name: 'User user',
			email: 'user@gmail.com',
			password: 'securepassword',
			isAdmin: false
		};
		user.password = bcryptService().hashPassword(user);
		await User.create(user);
		//Signup a admin
		let admin = {
			name: 'Admin admin',
			email: 'admin@gmail.com',
			password: 'securepassword',
			isAdmin: true
		};
		admin.password = bcryptService().hashPassword(admin);
		await User.create(admin);
  });
  
	test('User | Login | login successfully', async done => {
		const { body } = await request(api)
			.post('/public/login')
			.set('Accept', /json/)
			.send({
				email: 'user@gmail.com',
				password: 'securepassword'
			})
			.expect(200);

		expect(body.statusCode).toBe(200);
		expect(body.payload).toBeTruthy();

		user = await User.findOne({ email: body.payload.email });

		expect(user._id.toString()).toMatch(body.payload._id);
		expect(user.email).toMatch(body.payload.email);
		expect(body.payload.isAdmin).toBe(false);

		done();
  });
  
	test('Admin | Login | login successfully', async done => {
		const { body } = await request(api)
			.post('/public/login')
			.set('Accept', /json/)
			.send({
				email: 'admin@gmail.com',
				password: 'securepassword'
			})
			.expect(200);

		expect(body.statusCode).toBe(200);
		expect(body.payload).toBeTruthy();

		user = await User.findOne({ email: body.payload.email });

		expect(user._id.toString()).toMatch(body.payload._id);
		expect(user.email).toMatch(body.payload.email);
		expect(body.payload.isAdmin).toBe(true);

		done();
  });
  
	test('User | Login | login unsuccessful;user does not exist', async done => {
		const { body } = await request(api)
			.post('/public/login')
			.set('Accept', /json/)
			.send({
				email: 'user123@gmail.com',
				password: 'securepassword'
			});

		expect(body.statusCode).toBe(404);
		expect(body.payload).toMatchObject({});
		expect(body.errors.error).toMatch('User does not exist');

		const findUser = await User.findOne({ email: body.payload.email });

		expect(findUser).toBe(null);

		done();
  });
  
	test('User | Login | login unsuccessful; on wrong password', async done => {
		const { body } = await request(api)
			.post('/public/login')
			.set('Accept', /json/)
			.send({
				email: 'user@gmail.com',
				password: 'securepassword1'
			});

		expect(body.statusCode).toBe(400);
		expect(body.payload).toMatchObject({});
		expect(body.errors.error).toMatch('invalid email or password');

		const findUser = await User.findOne({ email: body.payload.email });

		expect(findUser).toBe(null);

		done();
	});
  })
