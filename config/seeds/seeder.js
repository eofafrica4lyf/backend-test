const UserSeeder = require('./user-seeder');
const TeamSeeder = require('./team-seeder');
const FixtureSeeder = require('./fixture-seeder');
const mongoose = require('../mongo-database');
console.log('Start Seeding');

require('dotenv').config();

const seederModules = [...UserSeeder, ...TeamSeeder, ...FixtureSeeder];

let counter = 0;
for (let index = 0; index < seederModules.length; index++) {
  //Saving each Section to database
  
	seederModules[index].save((error, _result) => {
		if (error) {
			console.log(error);
		}

		counter++;
		if (counter === seederModules.length) {
			//Disconnect if this is the last seed
			mongoose.disconnect().then(() => {
        console.log('Disconnecting');
        process.exit();
      });
		}
	});
}
