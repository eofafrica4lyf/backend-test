const jwt = require('jsonwebtoken');
const mongoose = require('../../config/mongo-database');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024
	},
	isAdmin: Boolean
});
//Define a method inside the schema
userSchema.methods.generateAuthTokenAdmin = function() {
	// Generate a new json web token: takes the payload a private key (don't store your
	// secrets in code, but in environment variables)
	// iat determines the age of the jwt
	const token = jwt.sign({ _id: this._id, isAdmin: true }, 'jwtPrivateKey');
	return token;
};

userSchema.methods.generateAuthTokenUser = function() {
	// Generate a new json web token: takes the payload a private key (don't store your
	// secrets in code, but in environment variables)
	// iat determines the age of the jwt
	const token = jwt.sign({ ...this._doc }, 'jwtPrivateKey');
	return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
