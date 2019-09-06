const {
	beforeAction,
	removeAllCollections,
	dropAllCollections,
	closeMongooseConnection,
	mongooseConnect
} = require('../../tests/setup/test-setup');
const mongoose = require('../mongo-database');

(async () => {
	await removeAllCollections();
	closeMongooseConnection().then(()=>{
    process.exit();
  });
})();
