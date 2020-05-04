const express = require('express');
const router = express.Router();

const { signup } = require('../controllers/userController.js');

router.get('/', (req, res) => {
	res.status(200).json('HELLO FROM API');
});

// router.get('/signup', (req, res) => {
// 	console.log('SIGN UP ROUTE WORKS');
// 	res.status(200).json('WOOORKS');
// });

router.post('/signup', signup);

module.exports = router;
