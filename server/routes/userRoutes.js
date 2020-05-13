const express = require('express');
const router = express.Router();

const { userSignupValidator } = require('../utils/validator/validator');

const { requiredLogin, isAdmin, isAuth } = require('../controllers/userAuth');

const { userById } = require('../controllers/userControllers');

// user routes for secret
router.get('/secret/:userId', requiredLogin, isAuth, isAdmin, (req, res) => {
	res.json({
		user: req.profile,
	});
});

// two middleware -> 1. users current logged in 2. users current logged in && admin

// for authorizing admins -> every time there is a parameter with the route :userId, the middleware userById will be invoked first
router.param('userId', userById);

module.exports = router;
