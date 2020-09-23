const mongoose = require("mongoose");

// creating new instance of mongoose schema class
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      // required means value is expected in these keys for the payload
      required: true,
      maxlength: 32,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
