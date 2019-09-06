const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;

const bodyParser = require('body-parser');
const express = require('express');
const mapRoutes = require('express-routes-mapper');

const config = require('../../config/');
const auth = require('../../api/policies/auth.policy');

const beforeAction = async () => {
	const testapp = express();
	const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');
	const mappedAuthRoutes = mapRoutes(config.privateRoutes, 'api/controllers/');

	testapp.use(bodyParser.urlencoded({ extended: false }));
	testapp.use(bodyParser.json());

	testapp.all('/private/*', (req, res, next) => auth(req, res, next));
	testapp.use('/public', mappedOpenRoutes);
	testapp.use('/private', mappedAuthRoutes);

	return testapp;
};

const removeAllCollections = async () => {
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName];
		await collection.deleteMany();
	}
	return;
};

const dropAllCollections = async () => {
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName];
		try {
			await collection.drop();
		} catch (error) {
			// Sometimes this error happens, but you can safely ignore it
			if (error.message === 'ns not found') return;
			// This error occurs when you use it.todo. You can
			// safely ignore this error too
			if (error.message.includes('a background operation is currently running'))
				return;
			console.log(error.message);
		}
	}
	return;
};

const closeMongooseConnection = async () => {
	await mongoose.connection.close();
	return;
};

const mongooseConnect = async databaseName => {
	// const url = `mongodb://localhost:27017/${databaseName}`;
	const url = process.env.MONGO_URI;
	await mongoose.connect(url, { useNewUrlParser: true });
	return;
};

module.exports = {
	setupDB(databaseName) {
		let api;
		// Connect to Mongoose
		beforeAll(async () => {
			api = await beforeAction();
			await mongooseConnect();
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
		return api;
	},
	beforeAction,
	removeAllCollections,
	dropAllCollections,
	closeMongooseConnection,
	mongooseConnect
};
