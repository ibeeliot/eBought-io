const categoryModel = require('../models/categoryModel');

exports.createCategory = (req, res) => {
	console.log('ATTEMPT: create new category');
	const category = new categoryModel(req.body);

	category.save((err, user) => {
		if (err) {
			console.log(`ERROR COMING FROM CREATE CATEGORY`);
			res.status(403).json({
				error: 'Category not created',
			});
		}
		console.log(`SUCCESS: new category ${req.body.name}`);
		res.status(200).json(user);
	});
};
