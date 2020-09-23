const User = require("../Models/user");
// used to generate json web token (signed token)
const jwt = require("jsonwebtoken");
// authorization check
const expressJWT = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signUp = (req, res) => {
  if (process.env.NODE_ENV === "dev") {
    console.log("signing UP", req.body);
  }
  console.log("! this is environment: ", process.env.NODE_ENV);
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
    // this conditional only kicks in if an email is found
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password don't match",
      });
    }

    // token gets created using user's _id and then added into process.env.JWT_SECRET env variable
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

// forces a "sign in" so that there is token received, otherwise, no token received means no "auth" property
exports.requireSignIn = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  // says if profile exists & auth exists and profile_id == res.auth_id then that user is specifically validated to the _id
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    res.status(403).json({
      error: "Access denied",
    });
  }
  console.log("!! reachign isAuth");
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin access denied",
    });
  }

  console.log("!! reaching IS ADMIN");
  next();
};
