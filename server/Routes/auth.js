// every express route needs to have an express injection & has invocation
const express = require("express");

const router = express.Router();

const {
  signUp,
  signIn,
  signOut,
} = require("../Controllers/auth");

const { userSignupValidator } = require("../Validator/index");
// route from api/users
router.post("/signup", userSignupValidator, signUp);

router.post("/signin", signIn);

router.get("/signout", signOut);

module.exports = router;
