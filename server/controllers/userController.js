const userModel = require('../models/userModel');
// grab custom error handler
const { errorHandler } = require('../helpers/dbErrorHandler');
// validator using express-validator
const { userSignupValidator } = require('../utils/validator/validator');

exports.signup = (req, res) => {
	console.log('REQ BODY: ', req.body);
	// take request body and create a new model from it
	const user = new userModel(req.body);
	// save into database after new user is registered

	// validation middleware

	user.save((err, user) => {
		if (err) {
			console.log(`ERROR: coming from signup route`);
			// created a unique error handler so that we can JUST get message and not worry about full object
			return res.status(400).json({ err: errorHandler(err) });
		}

		// delete user password on response
		user.salt = undefined;
		user.hashed_password = undefined;

		console.log(`SUCCESS: new user ${user.name} has been created`);
		res.status(200).json(user);
	});
};
