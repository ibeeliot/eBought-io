const express = require('express');
const router = express.Router();

const {
	login,
	logout,
	signup,
	requiredLogin,
	sendusers,
} = require('../controllers/userAuth.js');

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

// for authorizing admins
router.get('/admin', requiredLogin, (req, res) => {
	res.send('FOUND THE ADMIN');
});

module.exports = router;
