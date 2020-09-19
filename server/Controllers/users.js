const User = require("../Models/users");
// used to generate json web token (signed token)
const jwt = require("jsonwebtoken");
// authorization check
const expressJWT = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signUp = (req, res) => {
  console.log("req body:", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    // if error exists, send status otherwise send back new user info
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signIn = (req, res, next) => {
  // find user based on email
  const { email, password } = req.body;

  // finds objects within User collection that has an email field which matches the email from the request body
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "User with that email does not exist. Please sign up",
      });
    }

    // have check against password to verify against hashed password for same account
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password don't match",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // persist the token as 't' in cookie with expiry date, and setting httpOnly to true in order to help prevent XSS (since no javascript code can be parsed as it's only looking for http protocol aka string)
    res.cookie("t", token, { expire: new Date() + 99999, httpOnly: true });

    // return response with user and token to frontend client
    const { _id, name, email, role } = user;

    return res.status(200).json({ token, user: { _id, name, email, role } });
  });
};

exports.signOut = (req, res) => {
  // signing out will mean clearing the same cookie you made
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};
