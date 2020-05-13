const express = require('express');
const router = express.Router();

const { createCategory } = require('../controllers/categoryControllers.js');
const { requiredLogin, isAuth, isAdmin } = require('../controllers/userAuth');
const { userById } = require('../controllers/userControllers');

router.post(
	'/category/create/:userId',
	requiredLogin,
	isAuth,
	isAdmin,
	createCategory
);

router.param('userId', userById);

module.exports = router;
