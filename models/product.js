const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    category: String,
  },
  { collection: "product" }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;