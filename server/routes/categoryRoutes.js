const express = require('express');
const router = express.Router();

const { createCategory } = require('../controllers/categoryControllers.js');
const { requiredLogin, isAuth, isAdmin } = require('../controllers/userAuth');

router.post(
	'/category/create/:userId',
	requiredLogin,
	isAuth,
	isAdmin,
	createCategory
);

module.exports = router;
