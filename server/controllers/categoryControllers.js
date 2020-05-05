const categoryModel = require('../models/categoryModel');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.createCategory = (req, res) => {
	console.log('ATTEMPT: create new category');
	const category = new categoryModel(req.body);

	category.save((err, data) => {
		if (err) {
			console.log(`ERROR COMING FROM CREATE CATEGORY`);
			res.status(400).json({
				error: errorHandler(err),
			});
		}
		console.log(`SUCCESS: new category ${req.body.name}`);
		res.status(200).json({ data });
	});
};
