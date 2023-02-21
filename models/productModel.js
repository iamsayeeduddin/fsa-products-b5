const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  brand: { type: String, required: true, minLength: 3, maxLength: 10 },
  model: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  category: { type: String, required: true },
  discount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("products", productSchema);
