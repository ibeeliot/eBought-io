const userModel = require('../models/userModel');

exports.signup = (req, res) => {
	console.log('REQ BODY', req.body);
	// take request body and create a new model from it
	const user = new userModel(req.body);
	// save into database after new user is registered
	user.save((err, user) => {
		if (err) {
			return res.status(400).json({ err });
		}
		res.status(200).json(user);
	});
};
