const mongoose = require("mongoose");
// library to hash passwords
const crypto = require("crypto");
// const uuidv1 = require("uuidv1");
const { v1: uuidv1 } = require("uuid");

// creating new instance of mongoose schema class
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      // required means value is expected in these keys for the payload
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      // 0 will be authenticated user, 1 will be admin
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
    // not sure why timestamps is its own object schema
  },
  { timestamps: true }
);

// virtual fields
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    // this gives random string to userSchema object on salt field
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

  // this is what's called an instance method (similar to class.prototype.whateverFunction)
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      // creating a hash with sha1 protocol and using this.salt
      return (
        crypto
          .createHmac("sha1", this.salt)
          .update(password)
          // you can only use digest at end of method chains, subsequent methods will not work
          .digest("hex")
      );
    } catch (error) {
      if ((process.env.NODE_ENV = "development")) console.log("error: ", error);
      else return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
