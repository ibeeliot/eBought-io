const Category = require("../Models/category");

// import error Handler
const { errorHandler } = require("../Helpers/dbErrorHandler");

exports.create = (req, res, next) => {
  // create new Category class model from req.body
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err || !data) {
      res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      data,
    });
  });
};
