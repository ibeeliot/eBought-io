exports.userSignupValidator = (req, res, next) => {
  // express validator allows us to use check method
  // checks for various fields
  // password field must have input
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be between 3 to 32 characters")
    .notEmpty()
    // checks against regular expression, needs to contain @
    .matches(/[@]/)
    .withMessage("Email must contain @")
    // checks for length using min and max fields
    .isLength({ min: 4, max: 32 });
  req
    .check("password", "Password is required")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Password must be longer than 3 characters")
    // checks for message to contain a LEAST 1 number with \d regexp
    .matches(/\d/)
    .withMessage("Password must contain a number");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((err) => err.msg)[0];
    return res.status(400).json({ error: firstError });
  }

  next();
};
