const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide product name."],
    trim: true,
  },
  company: {
    type: String,
    enum: {
      values: [
        "nike",
        "adidas",
        "gucci",
        "versace",
        "fendi",
        "philipplein",
        "balenciaga",
        "louis vuitton",
        "palm angels",
      ],
      message: "{VALUE} is not supported",
    },
    required: [true, "Must provide company name."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Must provide product description."],
    trim: true,
  },
  createdAt: String,
  price: {
    type: Number,
    required: [true, "Must provide product price."],
    trim: true,
  },
  imgUrl: {
    type: String,
    required: [true, "Must Provide image link."],
    trim: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const ProductModel = mongoose.model("Products", ProductSchema);

module.exports = ProductModel;
