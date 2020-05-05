const express = require('express');
const router = express.Router();

const { userSignupValidator } = require('../utils/validator/validator');

const { requiredLogin } = require('../controllers/userAuth');

const { userById } = require('../controllers/userControllers');

// user routes for secret
router.get('/secret/:userId', requiredLogin, (req, res) => {
	res.json({
		user: res.locals.profile,
	});
});

// for authorizing admins
router.param('userId', userById);

module.exports = router;
