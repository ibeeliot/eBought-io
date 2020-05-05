const express = require('express');
const router = express.Router();

const { createCategory } = require('../controllers/categoryControllers.js');

router.post('/category/create', createCategory);

module.exports = router;
