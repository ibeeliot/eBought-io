const express = require("express");
const router = express.Router();

const { userById } = require("../Controllers/user");

const { requireSignIn, isAdmin, isAuth } = require("../Controllers/auth");

router.get("/secret/:userId", requireSignIn, isAuth, isAdmin, (req, res) => {
  res.status(200).json({
    user: req.profile,
    success: true,
  });
});

// param will look for any /:userId that will then be taken and be used to call the database for users with that userId
// alternatively, you could take params from req and use it as a middleware function
router.param("userId", userById);

module.exports = router;
