const userModal = require('../models/userModel');

exports.userById = (req, res, next, id) => {
	// same as .findOne({_id: id}, (err, user)=>{})
	userModal.findById(id).exec((err, user) => {
		// if user is NOT found then send back error object
		if (err || !user)
			res.status(400).json({
				error: 'User not found',
			});

		// req.locals.profile = user; // add to req object
		req.profile = user; // add to req object
		console.log(`VIEW DATA RES LOCALS PROFILE: ${res.profile}`);
		return next();
	});
};
