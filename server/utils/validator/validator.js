exports.userSignupValidator = (req, res, next) => {
	// validate req body information
	console.log('ATTEMPT: entering user validation...');
	req.check('name', 'Name is required').notEmpty();

	// email validation -> check char length -> check if @ . exists
	req
		.check('email', 'Email must be between 3 to 32 characters')
		.matches(/.+\@.+\..+/)
		.withMessage("Email must contain '@' and domain '.' something .")
		.isLength({
			min: 4,
			max: 32,
		});

	req.check('password', 'Password is required').notEmpty();

	req
		.check('password')
		.isLength({
			min: 6,
		})
		.withMessage('Password length is 6 characters')
		.matches(/\d/)
		.withMessage('Password must contain at least one number');

	// if you want to restrict to having a special character:
	// .matches(/[^\W]/)
	// .withMessage('Pasword must at least one special character(i.e. $,!,@,%');

	// return the first error that accumulates from all the errors (like how response.rows[0] is where you navigate for response data)
	const error = req.validationErrors();
	if (error) {
		// err.msg is the property you'll find for each error object in the validationErrors() array
		const firstError = error.map((err) => err.msg)[0];
		return res.status(400).json({ error: firstError });
	}

	console.log(`SUCCESS: user:${req.body.name} validation`);
	return next();
};
