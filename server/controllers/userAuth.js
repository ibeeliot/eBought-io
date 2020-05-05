const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken'); // JWT to generate signed token
const expressJwt = require('express-jwt'); // for authorization check

const { errorHandler } = require('../helpers/dbErrorHandler'); // grab custom error handler

// midleware for LOG IN

exports.login = (req, res, next) => {
	console.log(`REQ BODY EMAIL:`, req.body.email);

	// user is found via email
	userModel.findOne({ email: req.body.email }, (err, user) => {
		// if no user is found
		if (err || !user) {
			res.status(400).json({
				err: `User with that email does not exist. Register with that email first`,
			});
		}
		// if user is found via email, confirm email & password match
		if (!user.authenticate(req.body.password)) {
			return res.status(401).json({
				error: "Email and password don't match ",
			});
		}

		// generate a signed token with user id & secret from env
		token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
		// cookie will use 't' as alias / expire in 9999 seconds
		res.cookie('t', token, { expire: new Date() + 9999 });

		// return res with user & token
		const { _id, name, email, role } = user;

		console.log(`SUCCESS: user ${name} verified`);

		res.status(200).json({
			token,
			user: {
				_id,
				name,
				email,
				role,
			},
		});
	});
};

// midleware for LOG OUT

exports.logout = (req, res, next) => {
	// console.log(`REQ BODY EMAIL:`, req.body.email);
	// delete cookie by expiring it immediately
	// cookies.set('t', { maxAge: 0 });
	// cleaner method
	res.clearCookie('t');
	res.json({ message: 'Signout success' });
};

// middleware for SIGN UP
exports.signup = (req, res) => {
	console.log('REQ BODY: ', req.body);
	// take request body and create a new model from it
	const user = new userModel(req.body);

	// save into database after new user is registered
	user.save((err, user) => {
		if (err) {
			console.log(`ERROR: coming from signup route`);
			// created a unique error handler so that we can JUST get message and not worry about full object
			return res.status(400).json({ err: errorHandler(err) });
		}

		// delete user password on response
		// salt & hashed_password STILL exists in model
		user.salt = undefined;
		user.hashed_password = undefined;

		console.log(`SUCCESS: new user ${user.name} has been created`);
		res.status(200).json(user);
	});
};

// authentication admin with protected routes
exports.requiredLogin = expressJwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'auth',
});

// is authorized middleware that checks if user has a profile, auth, and id MATCHES on both
exports.isAuth = (req, res, next) => {
	let user = req.profile && req.auth && req.profile._id == req.auth._id;
	if (!user) {
		return res.status(403).json({
			error: 'Access denied',
		});
	}
	return next();
};

exports.isAdmin = (req, res, next) => {
	if (req.profile.role === 0) {
		return res.status(403).json({
			error: 'Admin resources! Access denied',
		});
	}
	return next();
};

// TEST FOR SENDING ALL USERS
exports.sendusers = (req, res, next) => {
	console.log(`TEST FOR ALL USERS`);
	const allusers = userModel.find().then((data) => data.json());
	console.log(`${allusers} - ALL USERS `);
	res.status(200).json(allusers);
};
