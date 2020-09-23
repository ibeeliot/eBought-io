// large library with a crap ton of utility functions. Avoid when ES6 can be written
const _ = require("lodash");
// helps to encode/decode image data, more popular than other libraries for image multiparser
const formidable = require("formidable");
// access to node fs library allowing us to read and write data
const fs = require("fs");
const Product = require("../Models/product");

// import error Handler
const { errorHandler } = require("../Helpers/dbErrorHandler");

exports.create = (req, res) => {
  // all form data will be saved as form
  let form = new formidable.IncomingForm();
  // extensions from this form like "jpg/png/etc" will be saved in this object
  form.keepExtensions = true;
  // fields will be properties of this file, and files will be any extra files that need to be preserved
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded. " + errorHandler(err),
      });
    }
    let product = new Product(fields);

    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({ result });
    });
  });
  // const product = new Product(req.body);
  // product.save((err, data) => {
  //   if (err || !data) {
  //     res.status(400).json({
  //       error: errorHandler(err),
  //     });
  //   }
  //   res.json({
  //     data,
  //   });
  // });
};
