const User = require("../Models/user");

// this method will be reused in order to find user by their /:userId
exports.userById = (req, res, next, id) => {
  // MongoDb's callback syntax "exec" allows error and user arguments to be passed back by findById async call
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};
