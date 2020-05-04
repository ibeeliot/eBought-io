const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = require('uuid/v1');

// new schema object from mongoose
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: 32
    },
    hashed_password: {
      type: String,
      required: true
    },
    about: {
      type: String,
      trim: true
    },
    salt: {
      type: String
    },
    role: {
      type: Number,
      // 0 = reg user, 1 = admin
      default: 0
    },
    //   object that stores user carts; user will be able to see which ones purchased
    history: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

// virtual field for setting into dynamic object password an encrypted property
userSchema.virtual('password').set(function(password) {
  this._password = password;
  this.salt = uuidv1();
  this.hashed_password = this.encryptPassword(password);
});
