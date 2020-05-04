const express = require('express');
const router = express.Router();

const {
	login,
	logout,
	signup,
	sendusers,
} = require('../controllers/userController.js');

const { userSignupValidator } = require('../utils/validator/validator');

// router.get('/users', sendusers);

// router.get('/signup', (req, res) => {
// 	console.log('SIGN UP ROUTE WORKS');
// 	res.status(200).json('WOOORKS');
// });

// for signing up users
router.post('/signup', userSignupValidator, signup);

// for logging in users
router.post('/login', login);

// for logging out users
router.get('/logout', logout);

module.exports = router;
