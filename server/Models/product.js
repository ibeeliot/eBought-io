const mongoose = require("mongoose");
// in order to extra _id for a collection to serve Mongoose's relationships similar to SQL foreign key
const { ObjectId } = mongoose.Schema;

// creating new instance of mongoose schema class
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      // required means value is expected in these keys for the payload
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      // required means value is expected in these keys for the payload
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      // required means value is expected in these keys for the payload
      required: true,
      maxlength: 15,
    },
    // ObjectId's mongoose's way of grabbing the _id for any collection if you have a ref property set to the collection you're wnating to tie in the _id of. In this case, you want the type to be the _id of the "Category" collections
    category: {
      type: ObjectId,
      // this is how you can build Mongo relationships
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      // Buffer is data type that needs to be converted into binary, good example would be images
      data: Buffer,
      contentType: String,
    },
    shipping: {
      required: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
