const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  subject: { type: String },
  message: { type: String },
  productId: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, required: true },
});

module.exports = mongoose.model("reviews", reviewSchema);
