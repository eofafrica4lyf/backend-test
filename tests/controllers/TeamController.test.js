const request = require('supertest');
const authService = require('../../api/services/auth.service');
const { UserQuery, TeamQuery } = require('../../api/queries/queries');
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
let userToken, adminToken;
let createdTeam1, createdTeam2, createdTeam3;

beforeAll(async () => {
	api = await beforeAction();
	await mongooseConnect(databaseName);

	//Signup a user
	let USER = {
		name: 'User user',
		email: 'user@gmail.com',
		password: 'securepassword',
		isAdmin: false
	};
	// const createdUser = await UserQuery.create(USER);
	userToken = authService().issue(USER);

	//Signup a admin
	let ADMIN = {
		name: 'Admin admin',
		email: 'admin@gmail.com',
		password: 'securepassword',
		isAdmin: true
	};
	// const createdAdmin = await UserQuery.create(ADMIN);
	adminToken = authService().issue(ADMIN);
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

describe('Team Creation', () => {
	test('Team | Creation | create successfully', async done => {
		const { body } = await request(api)
			.post('/private/team/create')
			.set('Accept', /json/)
			.set('Authorization', `Bearer ${adminToken}`)
			.send({
				name: 'Manchester City',
				coach: 'Frank Ljunberg',
				stadium: 'City of Dreams'
			});

		expect(body.statusCode).toBe(200);
		expect(body.payload).toBeTruthy();

		const team = await TeamQuery.findById(body.payload._id);

		expect(team.name).toBe(body.payload.name);
		expect(team.coach).toBe(body.payload.coach);
		expect(team.stadium).toBe(body.payload.stadium);

		done();
	});

	test('Team | Creation | create unsuccessfully by ordinary user', async done => {
		const { body } = await request(api)
			.post('/private/team/create')
			.set('Accept', /json/)
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				name: 'Manchester City',
				coach: 'Frank Ljunberg',
				stadium: 'City of Dreams'
			});

		expect(body.statusCode).toBe(401);
		expect(body.payload).toEqual(null);
		expect(body.message).toEqual(
			'You are not Authorized to perform this operation!'
		);

		done();
	});

	test('Team | Creation | duplicate created unsuccessfully by admin ', async done => {
		await TeamQuery.create({
			name: 'Manchester City',
			coach: 'Frank Ljunberg',
			stadium: 'City of Dreams'
		});

		const { body } = await request(api)
			.post('/private/team/create')
			.set('Accept', /json/)
			.set('Authorization', `Bearer ${adminToken}`)
			.send({
				name: 'Manchester City',
				coach: 'Frank Ljunberg',
				stadium: 'City of Dreams'
			});

		expect(body.statusCode).toBe(400);
		expect(body.payload).toEqual({});
		expect(body.message).toBe('team name has already been registered');
		done();
	});
});

describe('Team View', () => {
	beforeEach(async () => {
		createdTeam1 = await TeamQuery.create({
			name: 'Manchester City',
			coach: 'Frank Ljunberg',
			stadium: 'City of Dreams'
		});
		createdTeam2 = await TeamQuery.create({
			name: 'Manchester United',
			coach: 'Ole Gunnar',
			stadium: 'Old Trafford'
		});
		createdTeam3 = await TeamQuery.create({
			name: 'Liverpool',
			coach: 'David Cameron',
			stadium: 'Anfield'
		});
	});
	test('Team | View | view team details successfully by admin', async done => {
		const { body } = await request(api)
			.get(`/private/team/view/${createdTeam1._id}`)
			.set('Accept', /json/)
			.set('Authorization', `Bearer ${adminToken}`);

		expect(body.statusCode).toBe(200);
		expect(body.payload.name).toBe(createdTeam1.name);
		expect(body.payload.coach).toBe(createdTeam1.coach);

		done();
	});

	test('Team | View | view team details successfully by ordinary user', async done => {
		const { body } = await request(api)
			.get(`/private/team/view/${createdTeam2._id}`)
			.set('Accept', /json/)
			.set('Authorization', `Bearer ${userToken}`);

		expect(body.statusCode).toBe(200);
		expect(body.payload.name).toBe(createdTeam2.name);
		expect(body.payload.coach).toBe(createdTeam2.coach);

		done();
	});

	test('Team | View | view team details unsuccessfully due to wrong provided id', async done => {
		const { body } = await request(api)
			.get(`/private/team/view/789789886785`)
			.set('Accept', /json/)
			.set('Authorization', `Bearer ${adminToken}`);

		expect(body.statusCode).toBe(400);
		expect(body.message).toBe('team does not exist');
		expect(body.payload).toMatchObject({});

		done();
	});

	test('Team | View | view all team details successfully by admin', async done => {
		const { body } = await request(api)
			.get(`/private/teams`)
			.set('Accept', /json/)
			.set('Authorization', `Bearer ${adminToken}`);

		expect(body.statusCode).toBe(200);
		expect(body.payload.length).toBe(3);

		done();
	});
});

describe('Team Update', () => {
	beforeEach(async () => {
		createdTeam1 = await TeamQuery.create({
			name: 'Manchester City',
			coach: 'Frank Ljunberg',
			stadium: 'City of Dreams'
		});
		createdTeam2 = await TeamQuery.create({
			name: 'Manchester United',
			coach: 'Ole Gunnar',
			stadium: 'Old Trafford'
		});
		createdTeam3 = await TeamQuery.create({
			name: 'Liverpool',
			coach: 'David Cameron',
			stadium: 'Anfield'
		});
	});
	test('Team | Update | update team details successfully by admin', async done => {
		const { body } = await request(api)
			.put(`/private/team/update/${createdTeam1._id}`)
			.set('Accept', /json/)
			.set('Authorization', `Bearer ${adminToken}`)
			.send({
				coach: 'Me Myself',
				stadium: 'Wembley'
			});

		expect(body.statusCode).toBe(200);
		expect(body.payload.nModified).toBe(1);

		const team = await TeamQuery.findById(createdTeam1._id);

		expect(team.coach).toBe('Me Myself');
		expect(team.stadium).toBe('Wembley');

		done();
	});

	test('Team | Update | update team details unsuccessfully by ordinary user', async done => {
		const { body } = await request(api)
			.put(`/private/team/update/${createdTeam1._id}`)
			.set('Accept', /json/)
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				coach: 'Me Myself',
				stadium: 'Wembley'
			});

		expect(body.statusCode).toBe(401);
		expect(body.payload).toBe(null);
		expect(body.message).toBe(
			'You are not Authorized to perform this operation!'
		);
		done();
	});

	test('Team | Update | update team details unsuccessfully due to wrong provided id', async done => {
		const { body } = await request(api)
			.put(`/private/team/update/789789886785`)
			.set('Accept', /json/)
			.set('Authorization', `Bearer ${adminToken}`)
			.send({
				coach: 'Me Myself',
				stadium: 'Wembley'
			});
      
		expect(body.statusCode).toBe(400);
		expect(body.message).toBe('team does not exist');
		expect(body.payload).toMatchObject({});

		done();
	});

});

describe('Team Remove', () => {
	beforeEach(async () => {
		createdTeam1 = await TeamQuery.create({
			name: 'Manchester City',
			coach: 'Frank Ljunberg',
			stadium: 'City of Dreams'
		});
		createdTeam2 = await TeamQuery.create({
			name: 'Manchester United',
			coach: 'Ole Gunnar',
			stadium: 'Old Trafford'
		});
		createdTeam3 = await TeamQuery.create({
			name: 'Liverpool',
			coach: 'David Cameron',
			stadium: 'Anfield'
		});
	});
	test('Team | Remove | remove a team successfully by admin', async done => {
		const { body } = await request(api)
			.delete(`/private/team/remove/${createdTeam1._id}`)
			.set('Accept', /json/)
			.set('Authorization', `Bearer ${adminToken}`)
    
		expect(body.statusCode).toBe(200);
		expect(body.payload.deletedCount).toBe(1);

		const team = await TeamQuery.findById(createdTeam1._id);
    expect(team).toBe(null);
    
    const teams = await TeamQuery.findAll();
    expect(teams.length).toBe(2);
		done();
	});
  
  test('Team | Remove | remove a team unsuccessfully by ordinary user', async done => {
		const { body } = await request(api)
			.delete(`/private/team/remove/${createdTeam1._id}`)
			.set('Accept', /json/)
			.set('Authorization', `Bearer ${userToken}`)
    
		expect(body.statusCode).toBe(401);
		expect(body.message).toBe('You are not Authorized to perform this operation!');
		expect(body.payload).toBe(null);

		const team = await TeamQuery.findById(createdTeam1._id);
    expect(team).toBeTruthy();
    
    const teams = await TeamQuery.findAll();
    expect(teams.length).toBe(3);
		done();
	});

	test('Team | Remove | remove team unsuccessfully due to wrong provided id', async done => {
		const { body } = await request(api)
			.delete(`/private/team/remove/789789886785`)
			.set('Accept', /json/)
			.set('Authorization', `Bearer ${adminToken}`)
      
		expect(body.statusCode).toBe(400);
		expect(body.message).toBe('team does not exist');
		expect(body.payload).toMatchObject({});

		done();
	});

});
