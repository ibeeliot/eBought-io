const express = require("express");
const router = express.Router();

const { create } = require("../Controllers/product");
const { userById } = require("../Controllers/user");
const { requireSignIn, isAdmin, isAuth } = require("../Controllers/auth");

router.post("/create/:userId", requireSignIn, isAuth, isAdmin, create);

router.param("userId", userById);

module.exports = router;
